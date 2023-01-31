import type { ResolvedConfig, ResolvedServerUrls, ViteDevServer } from "vite";
import { QueryOptions, getQuery } from "./utils";

type PluginViteDevServer =ViteDevServer & {
  resolvedUrls: ResolvedServerUrls & { [key: string]: any };
}
type PluginOptions = { open?: boolean, query?: QueryOptions, path?: string, hash?: string }

export default async function urlQueryPlugin(options: PluginOptions) {
  let {open = false, query = {}, path = '', hash = ''} = options;
  // add #
  hash = hash && !hash.startsWith('#') ? `#${hash}` : hash;
  // remove /
  path = path && path.startsWith('/') ? path.slice(1) : path;
  // url query
  let urlQuery = await getQuery(query)
  return {
    name: "vite-plugin-dev-url",
    enforce: "pre",
    async configResolved(resolvedConfig: ResolvedConfig) {
      const command = resolvedConfig.command;
      // auto open browser
      if (open && command === "serve") {
        resolvedConfig.server.open = `${path}?${urlQuery}${hash}`;
      }
      return resolvedConfig;
    },
    configureServer( server: PluginViteDevServer ) {
      // cache function
      const cacheHandle = server.printUrls;
      server.printUrls = () => {
        let resolvedUrls = server.resolvedUrls;
        Object.keys(resolvedUrls).forEach((key) => {
            resolvedUrls[key] = resolvedUrls[key]!.map((url: string) =>`${url}${path}?${urlQuery}${hash}`);
          },
        );
        cacheHandle.call(server);
      };
    },
  };
}