import { Hono } from "hono"

import {
  type AgentInitiatorMode,
  getAgentInitiatorMode,
  updateConfig,
} from "~/lib/config"

export const settingsRoute = new Hono()

settingsRoute.get("/", (c) => {
  return c.json({ agentInitiatorMode: getAgentInitiatorMode() })
})

settingsRoute.patch("/", async (c) => {
  const body = await c.req.json<{ agentInitiatorMode?: AgentInitiatorMode }>()

  const validModes: Array<AgentInitiatorMode> = ["off", "all", "non-first"]
  if (
    body.agentInitiatorMode !== undefined
    && !validModes.includes(body.agentInitiatorMode)
  ) {
    return c.json({ error: "Invalid agentInitiatorMode" }, 400)
  }

  if (body.agentInitiatorMode !== undefined) {
    updateConfig({ agentInitiatorMode: body.agentInitiatorMode })
  }

  return c.json({ agentInitiatorMode: getAgentInitiatorMode() })
})
