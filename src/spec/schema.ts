import { Schema } from "effect"

// ----------------------------------------------------------------------------
// PARAMS
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// PARAMS - TOKEN:CREATE - PROFILE
// ----------------------------------------------------------------------------

export const Policy = Schema.Struct({
  type: Schema.String,
  discountCBD: Schema.Number,
  markupType: Schema.Literal("FIXAMOUNT", "PERCENT").pipe(Schema.optional),
  amount: Schema.Number.pipe(Schema.optional),
  markupPercent: Schema.NumberFromString.pipe(Schema.optional),
  term: Schema.Number,
  platformFee: Schema.NumberFromString,
})

export const PolicyFlight = Schema.Struct({
  airline: Schema.Record({
    key: Schema.String,
    value: Schema.Array(Schema.String),
  }),
  flight_class: Schema.String,
  airline_group: Schema.Record({
    key: Schema.String,
    value: Schema.String,
  }),
  type: Schema.Literal("PERCENT", "AMOUNT"),
  percent: Schema.NumberFromString.pipe(Schema.optional),
  amount: Schema.NumberFromString.pipe(Schema.optional),
})

export const Profile = Schema.Struct({
  code: Schema.String,
  policy: Policy,
  policyFlight: Schema.NullishOr(PolicyFlight),
})

export interface Profile extends Schema.Schema.Type<typeof Profile> {}
export interface ProfileEncoded extends Schema.Schema.Encoded<typeof Profile> {}

// ----------------------------------------------------------------------------
// PARAMS - TOKEN:CREATE
// ----------------------------------------------------------------------------

export const TokenCreateParams = Schema.Struct({
  username: Schema.String,
  password: Schema.String,
  signature: Schema.String,
  profile: Schema.Array(Profile),
})

export interface TokenCreateParams extends Schema.Schema.Type<typeof TokenCreateParams> {}
export interface TokenCreateParamsEncoded extends Schema.Schema.Encoded<typeof TokenCreateParams> {}

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT:SCHEDULE:LIST
// ----------------------------------------------------------------------------

const FlightClass = Schema.Literal("E", "PE", "B", "F", "PF")

export type FlightClass = Schema.Schema.Type<typeof FlightClass>

const PaxCount = Schema.Struct({
  ADT: Schema.Number.pipe(Schema.greaterThanOrEqualTo(1)),
  CHD: Schema.Number.pipe(Schema.greaterThanOrEqualTo(0)),
  INF: Schema.Number.pipe(Schema.greaterThanOrEqualTo(0)),
})

export interface PaxCount extends Schema.Schema.Type<typeof PaxCount> {}

export const ScheduleListParams = Schema.Data(
  Schema.Struct({
    carriers: Schema.Data(Schema.Array(Schema.String)),
    paxCount: Schema.Data(PaxCount),
    schedules: Schema.Data(
      Schema.Array(
        Schema.Data(
          Schema.Struct({
            origin: Schema.String,
            destination: Schema.String,
            departureDate: Schema.String,
            returnDate: Schema.optional(Schema.String),
            flightClass: Schema.optional(FlightClass),
          }),
        ),
      ),
    ),
  }),
)

export interface ScheduleListParams extends Schema.Schema.Type<typeof ScheduleListParams> {}

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT:SCHEDULE:FARE
// ----------------------------------------------------------------------------

export const ScheduleFareDetail = Schema.Array(
  Schema.Struct({
    segmentIDS: Schema.Array(Schema.String),
    journeyIDS: Schema.Array(Schema.String),
    agentCode: Schema.String,
    journeySegmentFares: Schema.Array(
      Schema.Struct({
        segmentFares: Schema.Array(
          Schema.Struct({
            fareGroupCode: FlightClass,
            fareCode: Schema.String,
            fareBasisCode: Schema.String,
            segmentID: Schema.String,
          }),
        ),
        journeyID: Schema.String,
      }),
    ),
    isCombinedJourneys: Schema.Boolean,
  }),
)

export const ScheduleFareParams = Schema.Struct({
  info: Schema.Struct({
    totalPaxs: Schema.Struct({
      CHD: Schema.Number,
      INF: Schema.Number,
      ADT: Schema.Number,
    }),
  }),
  scheduleFareDetail: ScheduleFareDetail,
})

export interface ScheduleFareParams extends Schema.Schema.Type<typeof ScheduleFareParams> {}

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT:BOOK
// ----------------------------------------------------------------------------

// const AdultTitle = Schema.Literal("MR", "MRS", "MS")
// const ChildTitle = Schema.Literal("MSTR", "MISS")

const ContactInfo = Schema.Struct({
  title: Schema.String,
  firstName: Schema.String,
  lastName: Schema.String,
  phoneNumber: Schema.String,
  email: Schema.String,
})

const Pax = Schema.Struct({
  paxType: Schema.String,
  paxID: Schema.String,
  nationality: Schema.String,
  title: Schema.String,
  firstName: Schema.String,
  lastName: Schema.String,
  dob: Schema.String,
  freeCheckinBaggage: Schema.optional(
    Schema.Array(
      Schema.Struct({
        baggageRoute: Schema.String,
        baggageWeight: Schema.String,
        baggageUnit: Schema.String,
      }),
    ),
  ),
})

// const AdultPax = Pax.pipe(Schema.extend(Schema.Struct({
//   title: AdultTitle,
// })))

// const ChildPax = Pax.pipe(Schema.extend(Schema.Struct({
//   title: ChildTitle,
// })))

export const FlightBookParams = Schema.Struct({
  info: Schema.Struct({
    contactInfo: ContactInfo,
    paxs: Schema.Array(Pax),
  }),
  scheduleFareDetail: ScheduleFareDetail,
})

export interface FlightBookParams extends Schema.Schema.Type<typeof FlightBookParams> {}

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT:CANCEL
// ----------------------------------------------------------------------------

export const FlightCancelParams = Schema.Struct({
  __token: Schema.String,
  bookingID: Schema.String,
})

export interface FlightCancelParams extends Schema.Schema.Type<typeof FlightCancelParams> {}

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT:ISSUE
// ----------------------------------------------------------------------------

export const FlightIssueParams = Schema.Struct({
  __token: Schema.String,
  bookingID: Schema.String,
})

export interface FlightIssueParams extends Schema.Schema.Type<typeof FlightIssueParams> {}

// const JsonRpcMethods = Schema.Literal(
//   "token:create",
//   "flight:schedule:list",
//   "flight:schedule:detail",
//   "flight:book",
//   "flight:cancel",
//   "flight:issue",
// )

// ----------------------------------------------------------------------------
// PAYLOADS
// ----------------------------------------------------------------------------

const JsonRpcBaseRequestPayload = Schema.Struct({
  jsonrpc: Schema.Literal(2),
  id: Schema.String,
  token: Schema.String,
})

// ----------------------------------------------------------------------------
// PAYLOADS - TOKEN:CREATE
// ----------------------------------------------------------------------------

const JsonRpcTokenCreatePayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("token:create"),
      params: TokenCreateParams,
    }),
  ),
)

export interface JsonRpcTokenCreatePayload extends Schema.Schema.Type<typeof JsonRpcTokenCreatePayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - FLIGHT:SCHEDULE:LIST
// ----------------------------------------------------------------------------

const JsonRpcFlightScheduleListPayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("flight:schedule:list"),
      params: ScheduleListParams,
    }),
  ),
)

export interface JsonRpcFlightScheduleListPayload extends Schema.Schema.Type<typeof JsonRpcFlightScheduleListPayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - FLIGHT:SCHEDULE:FARE
// ----------------------------------------------------------------------------

export const JsonRpcFlightScheduleFarePayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("flight:schedule:fare"),
      params: ScheduleFareParams,
    }),
  ),
)

export interface JsonRpcFlightScheduleFarePayload extends Schema.Schema.Type<typeof JsonRpcFlightScheduleFarePayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - FLIGHT:BOOK
// ----------------------------------------------------------------------------

export const JsonRpcFlightBookPayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("flight:book"),
      params: FlightBookParams,
    }),
  ),
)

export interface JsonRpcFlightBookPayload extends Schema.Schema.Type<typeof JsonRpcFlightBookPayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - FLIGHT:CANCEL
// ----------------------------------------------------------------------------

export const JsonRpcFlightCancelPayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("flight:cancel"),
      params: FlightCancelParams,
    }),
  ),
)

export interface JsonRpcFlightCancelPayload extends Schema.Schema.Type<typeof JsonRpcFlightCancelPayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - FLIGHT:ISSUE
// ----------------------------------------------------------------------------

export const JsonRpcFlightIssuePayload = JsonRpcBaseRequestPayload.pipe(
  Schema.extend(
    Schema.Struct({
      method: Schema.Literal("flight:issue"),
      params: FlightIssueParams,
    }),
  ),
)

export interface JsonRpcFlightIssuePayload extends Schema.Schema.Type<typeof JsonRpcFlightIssuePayload> {}

// ----------------------------------------------------------------------------
// PAYLOADS - UNION
// ----------------------------------------------------------------------------

export const JsonRpcPayloads = Schema.Union(
  JsonRpcTokenCreatePayload,
  JsonRpcFlightScheduleListPayload,
  JsonRpcFlightScheduleFarePayload,
  JsonRpcFlightBookPayload,
  JsonRpcFlightCancelPayload,
  JsonRpcFlightIssuePayload,
)

export type JsonRpcPayloads = Schema.Schema.Type<typeof JsonRpcPayloads>

// ----------------------------------------------------------------------------
// RESPONSE
// ----------------------------------------------------------------------------

const JsonRpcResponseResult = Schema.Struct({
  time: Schema.Struct({
    request: Schema.Number,
    response: Schema.Number,
    process: Schema.Number,
    unit: Schema.String,
  }),
  status: Schema.Literal("OK", "ERROR"),
  errors: Schema.optional(Schema.Array(Schema.String)),
})

export const JsonRpcResponsePayload = Schema.Struct({
  jsonrpc: Schema.Literal(2),
  id: Schema.String,
})

export type JsonRpcResponsePayload = Schema.Schema.Type<
  typeof JsonRpcResponsePayload
>

// ----------------------------------------------------------------------------
// RESPONSE - COMMON
// ----------------------------------------------------------------------------

export const JsonRpcCommonResponseBody = JsonRpcResponsePayload.pipe(
  Schema.extend(
    Schema.Struct({
      response: Schema.Struct({
        result: JsonRpcResponseResult,
      }),
    }),
  ),
)

export type JsonRpcCommonResponseBody = Schema.Schema.Type<
  typeof JsonRpcCommonResponseBody
>

// ----------------------------------------------------------------------------
// RESPONSE - TOKEN:CREATE
// ----------------------------------------------------------------------------

export const JsonRpcTokenCreateResponseBody = JsonRpcResponsePayload.pipe(
  Schema.extend(
    Schema.Struct({
      response: Schema.Struct({
        result: JsonRpcResponseResult,
        token: Schema.String,
      }),
    }),
  ),
)

export type JsonRpcTokenCreateResponseBody = Schema.Schema.Type<
  typeof JsonRpcTokenCreateResponseBody
>

// ALIAS
export interface TokenCreate extends Schema.Schema.Type<typeof JsonRpcTokenCreateResponseBody> {}

// ----------------------------------------------------------------------------
// RESPONSE - FLIGHT:SCHEDULE:LIST
// ----------------------------------------------------------------------------

const Journey = Schema.Struct({
  journeyID: Schema.String,
  origin: Schema.String,
  destination: Schema.String,
  segmentIDS: Schema.Array(Schema.String),
})

export type Journey = Schema.Schema.Type<typeof Journey>

const CarrierInfo = Schema.Struct({
  carrierCode: Schema.String,
  flightNumber: Schema.String,
  opSuffix: Schema.optional(Schema.String),
})

const Station = Schema.Struct({
  code: Schema.String,
  tz: Schema.Union(Schema.Number, Schema.Literal("?")), // timezone could be unknown
})

const Segment = Schema.Struct({
  segmentID: Schema.String,
  origin: Station,
  destination: Station,
  arrivalDateTime: Schema.String,
  departureDateTime: Schema.String,
  stopOver: Schema.Number,
  operatingCarrierInfo: CarrierInfo,
  marketingCarrierInfo: CarrierInfo,
  legIDS: Schema.Array(Schema.String),
})

export type Segment = Schema.Schema.Type<typeof Segment>

const Leg = Schema.Struct({
  legID: Schema.String,
  origin: Station,
  destination: Station,
  departureDateTime: Schema.String,
  arrivalDateTime: Schema.String,
})

export type Leg = Schema.Schema.Type<typeof Leg>

const Offer = Schema.Struct({
  paxType: Schema.String,
  totalFare: Schema.Number,
  agentSellingFare: Schema.Number,
  baseFare: Schema.Number,
  agentServiceFee: Schema.Number,
  agentServiceFeePPN: Schema.Number,
  totalTax: Schema.Number,
  agentIssuedFee: Schema.Number.pipe(Schema.optional),
})

const AgentOffers = Schema.Struct({
  agentCode: Schema.String,
  supplairCode: Schema.String,
  isSupportNKRI: Schema.Boolean.pipe(Schema.optional),
  offers: Schema.Array(Offer),
})

const Fare = Schema.Struct({
  fareCode: Schema.String,
  fareBasisCode: Schema.String,
  fareGroupCode: Schema.String,
  seatAvailable: Schema.Number,
  baggageFree: Schema.Struct({
    weight: Schema.String,
    unit: Schema.String,
  }),
  canBuyAdditionalBaggage: Schema.Boolean,
  currencyCode: Schema.String,
  agentOffersFare: Schema.Array(AgentOffers),
})

export interface Fare extends Schema.Schema.Type<typeof Fare> {}

const SegmentFare = Schema.Struct({
  segmentID: Schema.String,
  fares: Schema.Array(Fare),
})

export interface SegmentFare extends Schema.Schema.Type<typeof SegmentFare> {}

const JourneySegmentFare = Schema.Struct({
  journeyID: Schema.String,
  segmentFares: Schema.Array(SegmentFare),
})

export type JourneySegmentFare = Schema.Schema.Type<typeof JourneySegmentFare>

const Schedule = Schema.Struct({
  journeyType: Schema.String,
  journeyIDS: Schema.Array(Schema.String),
  segmentIDS: Schema.Array(Schema.String),
  currencyCode: Schema.NullishOr(Schema.String),
  journeySegmentFares: Schema.Array(JourneySegmentFare),
})

export interface Schedule extends Schema.Schema.Type<typeof Schedule> {}

// NOTE: Jan-14-2025
// We may get { journeys: [{}], segments: [null], legs: [null] }

const EmptyObject = Schema.Struct({})
const JourneyX = Schema.Union(Journey, EmptyObject)
type JourneyX = Schema.Schema.Type<typeof JourneyX>

export const isJourney = (x: JourneyX): x is Journey => {
  return "journeyID" in x
}

export const JsonRpcFlightScheduleListResponseBody = JsonRpcResponsePayload.pipe(
  Schema.extend(
    Schema.Struct({
      response: Schema.Struct({
        result: JsonRpcResponseResult,
        info: Schema.Struct({
          journeys: Schema.Array(JourneyX),
          segments: Schema.Array(Schema.NullOr(Segment)),
          legs: Schema.Array(Schema.NullOr(Leg)),
        }).pipe(Schema.optional), // NOTE: info my not exists if scedules is empty
        schedules: Schema.Array(Schedule).pipe(Schema.optional), // NOTE: schedules may not exists (?)
      }),
    }),
  ),
)

export type JsonRpcFlightScheduleListResponseBody = Schema.Schema.Type<
  typeof JsonRpcFlightScheduleListResponseBody
>

// ALIAS for JsonRpcFlightScheduleListResponseBody
export interface ScheduleList extends Schema.Schema.Type<typeof JsonRpcFlightScheduleListResponseBody> {}

// ----------------------------------------------------------------------------
// RESPONSE - FLIGHT:SCHEDULE:FARE
// ----------------------------------------------------------------------------

const BookingSegment = Schema.Struct({
  segmentID: Schema.String,
  operatingCarrierInfo: CarrierInfo,
  marketingCarrierInfo: CarrierInfo,
  originCode: Schema.String,
  destinationCode: Schema.String,
  departureDateTime: Schema.String,
  arrivalDateTime: Schema.String,
  arrivalTz: Schema.Number.pipe(Schema.optional), // FIXME: check with cbe
  departureTz: Schema.Number.pipe(Schema.optional), // FIXME: check with cbe
})

const BookingJourney = Schema.Struct({
  journeyID: Schema.String,
  originCode: Schema.String,
  destinationCode: Schema.String,
  segmentIDS: Schema.Array(Schema.String),
})

const BookingTax = Schema.Struct({
  taxCode: Schema.String,
  taxFare: Schema.Number,
})

const BookingFare = Schema.Struct({
  paxType: Schema.String,
  price: Schema.Struct({
    baseFare: Schema.Number,
    totalTax: Schema.Number,
    taxs: Schema.Array(BookingTax),
    agentIssuedFee: Schema.Number.pipe(Schema.optional),
    agentSellingFare: Schema.Number.pipe(Schema.optional),
    agentServiceFee: Schema.Number.pipe(Schema.optional),
    agentServiceFeePPN: Schema.Number.pipe(Schema.optional),
  }),
})

const BookingFareSummary = Schema.Struct({
  totalBaseFare: Schema.Number,
  totalTax: Schema.Number,
  totalFare: Schema.Number,
  agentIssuedFee: Schema.Number.pipe(Schema.optional),
  agentSellingFare: Schema.Number.pipe(Schema.optional),
  agentServiceFee: Schema.Number.pipe(Schema.optional),
  agentServiceFeePPN: Schema.Number.pipe(Schema.optional),
})

const BookingSSR = Schema.Struct({
  ssrType: Schema.String,
  ssrCode: Schema.String,
  ssrText: Schema.String,
  ssrPrice: Schema.Number,
  ssrRoute: Schema.String,
  ssrWeight: Schema.String,
  ssrUnit: Schema.String,
})

const BookingSegmentSSR = Schema.Struct({
  segmentID: Schema.String,
  ssrs: Schema.Array(BookingSSR),
})

const BookingScheduleFareDetail = Schema.Struct({
  journeyIDS: Schema.Array(Schema.String),
  segmentIDS: Schema.Array(Schema.String),
  agentCode: Schema.String,
  supplairCode: Schema.String,
  fareDetails: Schema.Array(BookingFare),
  fareSummary: BookingFareSummary,
  segmentSSRS: Schema.Array(BookingSegmentSSR).pipe(Schema.optional),
})

export const JsonRpcFlightScheduleFareResponseBody = JsonRpcResponsePayload.pipe(
  Schema.extend(
    Schema.Struct({
      response: Schema.Struct({
        result: JsonRpcResponseResult,
        info: Schema.Struct({
          totalPaxs: PaxCount,
          segments: Schema.Array(BookingSegment),
        }),
        scheduleFareDetail: Schema.Array(BookingScheduleFareDetail),
      }),
    }),
  ),
)

export type JsonRpcFlightScheduleFareResponseBody = Schema.Schema.Type<
  typeof JsonRpcFlightScheduleFareResponseBody
>
// ALIAS
export interface ScheduleFare extends Schema.Schema.Type<typeof JsonRpcFlightScheduleFareResponseBody> {}

// ----------------------------------------------------------------------------
// RESPONSE - FLIGHT:BOOK
// ----------------------------------------------------------------------------

const BookingFareSummary2 = BookingFareSummary.pipe(
  Schema.extend(
    Schema.Struct({
      NTSA: Schema.Number,
      totalPrepaidBaggage: Schema.Number,
      totalNTA: Schema.Number,
      wholesalerFee: Schema.Number,
    }),
  ),
)

const BookingPnr = Schema.Struct({
  supplairCode: Schema.String,
  agentCode: Schema.String,
  info: Schema.Struct({
    contactInfo: ContactInfo,
    paxs: Schema.Array(Pax),
    journeys: Schema.Array(BookingJourney),
    segments: Schema.Array(BookingSegment),
  }),
  bookingSummary: BookingFareSummary2,
  bookingTimeLimit: Schema.String,
  bookingDateTime: Schema.String,
  scheduleFareDetail: Schema.Array(BookingScheduleFareDetail),
  bookingID: Schema.String,
  bookingStatus: Schema.String,
  bookingCode: Schema.String,
})

export const JsonRpcFlightBookResponseBody = JsonRpcResponsePayload.pipe(
  Schema.extend(
    Schema.Struct({
      response: Schema.Struct({
        result: JsonRpcResponseResult,
        pnrs: Schema.Array(BookingPnr),
      }),
    }),
  ),
)

export interface FlightBookResponse extends Schema.Schema.Type<typeof JsonRpcFlightBookResponseBody> {}

// ----------------------------------------------------------------------------
// RESPONSE - FLIGHT:CANCEL
// ----------------------------------------------------------------------------

export const JsonRpcFlightCancelResponseBody = JsonRpcFlightBookResponseBody
export interface FlightCancelResponse extends Schema.Schema.Type<typeof JsonRpcFlightCancelResponseBody> {}

// ----------------------------------------------------------------------------
// RESPONSE - FLIGHT:ISSUE
// ----------------------------------------------------------------------------

export const JsonRpcFlightIssueResponseBody = JsonRpcFlightBookResponseBody
export interface FlightIssueResponse extends Schema.Schema.Type<typeof JsonRpcFlightIssueResponseBody> {}

// ----------------------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------------------

export const ParsedFareInfo = Schema.Struct({
  carrierCode: Schema.String,
  flightNumber: Schema.String,
  fareBasisCode: Schema.String,
})

export type ParsedFareInfo = Schema.Schema.Type<typeof ParsedFareInfo>
