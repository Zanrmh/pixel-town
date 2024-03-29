/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.4.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as agent_conversation from "../agent/conversation";
import type * as agent_embeddingsCache from "../agent/embeddingsCache";
import type * as agent_memory from "../agent/memory";
import type * as constants from "../constants";
import type * as crons from "../crons";
import type * as engine_abstractGame from "../engine/abstractGame";
import type * as engine_historicalObject from "../engine/historicalObject";
import type * as http from "../http";
import type * as init from "../init";
import type * as messages from "../messages";
import type * as music from "../music";
import type * as pixelTown_agent from "../pixelTown/agent";
import type * as pixelTown_agentDescription from "../pixelTown/agentDescription";
import type * as pixelTown_agentInputs from "../pixelTown/agentInputs";
import type * as pixelTown_agentOperations from "../pixelTown/agentOperations";
import type * as pixelTown_conversation from "../pixelTown/conversation";
import type * as pixelTown_conversationMembership from "../pixelTown/conversationMembership";
import type * as pixelTown_game from "../pixelTown/game";
import type * as pixelTown_ids from "../pixelTown/ids";
import type * as pixelTown_inputHandler from "../pixelTown/inputHandler";
import type * as pixelTown_inputs from "../pixelTown/inputs";
import type * as pixelTown_insertInput from "../pixelTown/insertInput";
import type * as pixelTown_location from "../pixelTown/location";
import type * as pixelTown_main from "../pixelTown/main";
import type * as pixelTown_movement from "../pixelTown/movement";
import type * as pixelTown_player from "../pixelTown/player";
import type * as pixelTown_playerDescription from "../pixelTown/playerDescription";
import type * as pixelTown_world from "../pixelTown/world";
import type * as pixelTown_worldMap from "../pixelTown/worldMap";
import type * as testing from "../testing";
import type * as util_assertNever from "../util/assertNever";
import type * as util_asyncMap from "../util/asyncMap";
import type * as util_compression from "../util/compression";
import type * as util_FastIntegerCompression from "../util/FastIntegerCompression";
import type * as util_geometry from "../util/geometry";
import type * as util_isSimpleObject from "../util/isSimpleObject";
import type * as util_minheap from "../util/minheap";
import type * as util_object from "../util/object";
import type * as util_openai from "../util/openai";
import type * as util_sleep from "../util/sleep";
import type * as util_types from "../util/types";
import type * as util_xxhash from "../util/xxhash";
import type * as world from "../world";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "agent/conversation": typeof agent_conversation;
  "agent/embeddingsCache": typeof agent_embeddingsCache;
  "agent/memory": typeof agent_memory;
  constants: typeof constants;
  crons: typeof crons;
  "engine/abstractGame": typeof engine_abstractGame;
  "engine/historicalObject": typeof engine_historicalObject;
  http: typeof http;
  init: typeof init;
  messages: typeof messages;
  music: typeof music;
  "pixelTown/agent": typeof pixelTown_agent;
  "pixelTown/agentDescription": typeof pixelTown_agentDescription;
  "pixelTown/agentInputs": typeof pixelTown_agentInputs;
  "pixelTown/agentOperations": typeof pixelTown_agentOperations;
  "pixelTown/conversation": typeof pixelTown_conversation;
  "pixelTown/conversationMembership": typeof pixelTown_conversationMembership;
  "pixelTown/game": typeof pixelTown_game;
  "pixelTown/ids": typeof pixelTown_ids;
  "pixelTown/inputHandler": typeof pixelTown_inputHandler;
  "pixelTown/inputs": typeof pixelTown_inputs;
  "pixelTown/insertInput": typeof pixelTown_insertInput;
  "pixelTown/location": typeof pixelTown_location;
  "pixelTown/main": typeof pixelTown_main;
  "pixelTown/movement": typeof pixelTown_movement;
  "pixelTown/player": typeof pixelTown_player;
  "pixelTown/playerDescription": typeof pixelTown_playerDescription;
  "pixelTown/world": typeof pixelTown_world;
  "pixelTown/worldMap": typeof pixelTown_worldMap;
  testing: typeof testing;
  "util/assertNever": typeof util_assertNever;
  "util/asyncMap": typeof util_asyncMap;
  "util/compression": typeof util_compression;
  "util/FastIntegerCompression": typeof util_FastIntegerCompression;
  "util/geometry": typeof util_geometry;
  "util/isSimpleObject": typeof util_isSimpleObject;
  "util/minheap": typeof util_minheap;
  "util/object": typeof util_object;
  "util/openai": typeof util_openai;
  "util/sleep": typeof util_sleep;
  "util/types": typeof util_types;
  "util/xxhash": typeof util_xxhash;
  world: typeof world;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
