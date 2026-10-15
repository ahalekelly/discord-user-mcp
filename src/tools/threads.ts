import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { DiscordClient } from "../client.js";
import { formatThreadList } from "../formatters.js";
import { toolResult } from "./helpers.js";

export function registerThreadTools(
  server: McpServer,
  client: DiscordClient,
): void {
  server.tool(
    "discord_list_threads",
    "List archived public threads in a channel. " +
      "Works with user accounts (does not require bot privileges).",
    {
      channel_id: z.string().describe("Channel to list threads from."),
    },
    async ({ channel_id }) => {
      const result = await client.getArchivedPublicThreads(channel_id);
      return toolResult(formatThreadList(result.threads));
    },
  );
}
