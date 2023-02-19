import { defineConfig, loadEnv } from "vite"
import dns from "dns"

dns.setDefaultResultOrder("verbatim")

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "")

	return {
		server: {
			host: "localhost",
		},
		define: {
			__ENV__: env,
		},
	}
})
