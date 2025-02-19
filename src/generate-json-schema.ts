import { Data, JSONSchema, Schema } from "effect"
import { stringify } from "yaml"
import {
  FlightBookParams,
  FlightBookResponse,
  FlightCancelParams,
  FlightIssueParams,
  FlightScheduleFareParams,
  FlightScheduleFareResponse,
  FlightScheduleListParams,
  FlightScheduleListResponse,
  JsonRpcFlightBookPayload,
  JsonRpcFlightBookResponseBody,
  JsonRpcFlightCancelPayload,
  JsonRpcFlightCancelResponseBody,
  JsonRpcFlightIssuePayload,
  JsonRpcFlightIssueResponseBody,
  JsonRpcFlightScheduleFarePayload,
  JsonRpcFlightScheduleFareResponseBody,
  JsonRpcFlightScheduleListPayload,
  JsonRpcFlightScheduleListResponseBody,
  JsonRpcTokenCreatePayload,
  JsonRpcTokenCreateResponseBody,
  TokenCreateParams,
  TokenCreateResponse,
} from "./spec/schema"

function methodToName(method: string) {
  return method.replace(/:/g, "_")
}

type TFormat = "yaml" | "json"

const serializer = (format: TFormat, value: unknown) =>
  format === "yaml" ? stringify(value) : JSON.stringify(value, null, 2)

function generate1(format: TFormat) {
  const tuples = Data.array([
    Data.tuple("token:create", JsonRpcTokenCreatePayload, JsonRpcTokenCreateResponseBody),
    Data.tuple("flight:schedule:list", JsonRpcFlightScheduleListPayload, JsonRpcFlightScheduleListResponseBody),
    Data.tuple("flight:schedule:fare", JsonRpcFlightScheduleFarePayload, JsonRpcFlightScheduleFareResponseBody),
    Data.tuple("flight:book", JsonRpcFlightBookPayload, JsonRpcFlightBookResponseBody),
    Data.tuple("flight:cancel", JsonRpcFlightCancelPayload, JsonRpcFlightCancelResponseBody),
    Data.tuple("flight:issue", JsonRpcFlightIssuePayload, JsonRpcFlightIssueResponseBody),
  ]) as ReadonlyArray<readonly [string, Schema.Schema<unknown>, Schema.Schema<unknown>]>

  for (const [method, request, response] of tuples) {
    const requestName = `${methodToName(method)}_request`
    const responseName = `${methodToName(method)}_response`
    const requestJsonSchema = JSONSchema.make(request)
    const responseJsonSchema = JSONSchema.make(response)

    Bun.write(`./out/json_schema/${requestName}.${format}`, serializer(format, requestJsonSchema))
    Bun.write(`./out/json_schema/${responseName}.${format}`, serializer(format, responseJsonSchema))
  }
}

function generate2(format: TFormat) {
  const tuples = Data.array([
    Data.tuple("token:create", TokenCreateParams, TokenCreateResponse),
    Data.tuple("flight:schedule:list", FlightScheduleListParams, FlightScheduleListResponse),
    Data.tuple("flight:schedule:fare", FlightScheduleFareParams, FlightScheduleFareResponse),
    Data.tuple("flight:book", FlightBookParams, FlightBookResponse),
    Data.tuple("flight:cancel", FlightCancelParams, FlightBookResponse),
    Data.tuple("flight:issue", FlightIssueParams, FlightBookResponse),
  ]) as ReadonlyArray<readonly [string, Schema.Schema<unknown>, Schema.Schema<unknown>]>

  for (const [method, request, response] of tuples) {
    const requestName = `${methodToName(method)}_request`
    const responseName = `${methodToName(method)}_response`
    const requestJsonSchema = JSONSchema.make(request)
    const responseJsonSchema = JSONSchema.make(response)

    Bun.write(`./out/json_schema/${requestName}.${format}`, serializer(format, requestJsonSchema))
    Bun.write(`./out/json_schema/${responseName}.${format}`, serializer(format, responseJsonSchema))
  }
}

// -- MAIN ---------------------------------------------------------------------

generate2("json")
