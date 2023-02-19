import Navigo from "navigo"

let effects = []
let currentEffectOrder = 0

let rootComponent = null
let rootContainer = null

let states = []
let currentStateOrder = 0

// Router
export const router = new Navigo("/", { linksSelector: "a", hash: true })

// Render
export const render = (component, container) => {
	container.innerHTML = component()

	rootComponent = component
	rootContainer = container

	effects.forEach((effect) => {
		effect.cb()
	})
}

export const debounce = (fn, timeout = 100) => {
	let timeId = null

	return (...rest) => {
		if (timeId) clearTimeout(timeId)

		timeId = setTimeout(() => fn(...rest), timeout)
	}
}

export const rerender = debounce(() => {
	currentStateOrder = 0
	currentEffectOrder = 0
	rootContainer.innerHTML = rootComponent()

	effects.forEach((effect) => {
		// shouldRunEffect = true khi không truyền deps hoặc deps khác nhau
		const shouldRunEffect =
			!effect.nextDeps ||
			effect.nextDeps?.some((dep, i) => {
				return dep !== effect?.prevDeps?.[i]
			})

		if (shouldRunEffect) {
			effect.cb()
		}
	})
})

// html
export const html = ([first, ...strings], ...values) => {
	return values
		.reduce((acc, curr) => acc.concat(curr, strings.shift()), [first])
		.filter((x) => (x && x !== true) || x === 0)
		.join("")
}

export const useState = (initialState) => {
	let state
	let stateOrder = currentStateOrder

	if (states[stateOrder] !== undefined) {
		state = states[stateOrder]
	} else {
		state = states[stateOrder] = initialState
	}

	const updater = (newState) => {
		if (newState === undefined) {
			throw new Error("New state must not be undefined")
		}

		if (typeof newState === "function") {
			states[stateOrder] = newState(states[stateOrder])
		} else {
			states[stateOrder] = newState
		}

		rerender()
	}

	currentStateOrder++

	return [state, updater]
}

export const useEffect = (cb, deps) => {
	let effectOrder = currentEffectOrder

	if (!effects[effectOrder]) {
		effects.push({
			cb: cb,
			prevDeps: null,
			nextDeps: deps,
		})
	} else {
		effects[effectOrder] = {
			cb: cb,
			prevDeps: effects[effectOrder].nextDeps,
			nextDeps: deps,
		}
	}

	currentEffectOrder++
}

export const useTitle = (initialTitle) => {
	const [title, setTitle] = useState(initialTitle)

	useEffect(() => {
		document.title = title
	}, [])

	return [title, setTitle]
}

router.on("/*", () => {}, {
	before(done, match) {
		states = []
		currentStateOrder = 0
		effects = []
		currentEffectOrder = 0

		done()
	},
})
