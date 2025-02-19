import { Schema } from "effect"

export const Skip = Symbol("__skip__")

declare module "effect/Schema" {
  namespace Annotations {
    interface GenericSchema<A> extends Schema<A> {
      [Skip]?: boolean
    }
  }
}

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// GENERIC
// ----------------------------------------------------------------------------

export const DateYMD = Schema.String.annotations({
  description: "Date in YYYY-MM-DD format",
  title: "Date YYYY-MM-DD",
  examples: ["2025-02-19"],
})

export const DateTimeLocal = Schema.String.annotations({
  description: "Date and time in YYYY-MM-DDTHH:mm at local timezone",
  title: "Date and time YYYY-MM-DDTHH:mm",
  examples: ["2025-02-19T16:55"],
})

export const DateTimeUTC = Schema.String.annotations({
  description: "Date and time in YYYY-MM-DDTHH:mm at UTC timezone",
  title: "Date and time YYYY-MM-DDTHH:mm",
  examples: ["2025-02-19T16:55"],
})

export const AgentCode = Schema.String.annotations({
  description: "Agent code",
  title: "Agent code",
  examples: ["124959"],
})

export const AgentCodes = Schema.Array(AgentCode).annotations({
  description: "List of agent codes",
  title: "Agent codes",
  examples: [["124959", "124960"]],
})

export const BookingStatus = Schema.Literal("BOOKED", "CANCELLED", "TICKETED")

export const BookingCode = Schema.String.annotations({
  description: "Booking code",
  title: "Booking code",
  examples: ["IWSVZM"],
})

export const BookingID = Schema.String.annotations({
  description: "Booking ID",
  title: "Booking ID",
  examples: ["LAW~IWSVZM~1411637"],
})

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// PARAMS
// ----------------------------------------------------------------------------

// TOKEN:CREATE
//   params:
//     username: UserName
//     password: Password
//     signature: Signature

export const UserName = Schema.String.annotations({
  description: "Api credentials username",
  title: "Username",
  examples: ["api-001"],
})

export const Password = Schema.String.annotations({
  description: "Api credentials password",
  title: "Password",
  examples: ["password"],
})

export const Signature = Schema.String.annotations({
  description: "Api credentials computed signature `md5(username + password + pre-shared-key)`",
  title: "Signature",
  examples: ["926a161c6419512d711089538c80ac70"],
})

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// PARAMS - FLIGHT
// ----------------------------------------------------------------------------

// FLIGHT:SCHEDULE:LIST
//   params:
//     carriers: Carriers
//     paxCount: PaxCount
//     schedules: Schedules

export const Carrier = Schema.String.annotations({
  description: "Carrier code.\nAvailable codes are QG, GA, ...",
  title: "Carrier code",
  examples: ["QG"],
  [Skip]: false,
})

export const Carriers = Schema.Array(Carrier).annotations({
  description: "List of carrier codes",
  title: "Carriers",
  examples: [["QG", "GA"]],
})

export const PaxCount = Schema.Struct({
  ADT: Schema.Number.pipe(Schema.greaterThanOrEqualTo(1)),
  CHD: Schema.Number.pipe(Schema.greaterThanOrEqualTo(0)),
  INF: Schema.Number.pipe(Schema.greaterThanOrEqualTo(0)),
}).annotations({
  required: true,
  description: "Passenger count for each passenger type",
  title: "Pax count",
  default: { ADT: 1, CHD: 0, INF: 0 },
  examples: [{ ADT: 1, CHD: 0, INF: 0 }],
})

export const StationCode = Schema.String.annotations({
  description: "Station code",
  title: "Station code",
  examples: ["HLP"],
})

export const Schedule = Schema.Data(
  Schema.Struct({
    origin: StationCode,
    destination: StationCode,
    departureDate: DateYMD,
    returnDate: Schema.optional(DateYMD),
  }),
)

export const Schedules = Schema.Array(Schedule).annotations({
  description: "List of schedules",
  title: "Schedules",
  examples: [[{
    origin: "HLP",
    destination: "DPS",
    departureDate: "2024-06-27",
    returnDate: "2024-06-28",
  }]],
})

// FLIGHT:SCHEDULE:FARE
//   params:
//     info: ScheduleFareInfoParams
//     scheduleFareDetail: ScheduleFareDetails

export const JourneyID = Schema.String.annotations({
  description: "Journey ID",
  title: "Journey ID",
  examples: ["QG194~HLP~DPS"],
})

export const SegmentID = Schema.String.annotations({
  description: "Segment ID",
  title: "Segment ID",
  examples: ["QG~194~~HLP~DPS~2024-06-27T16:55~2024-06-27T19:45"],
})

export const LegID = Schema.String.annotations({
  description: "Leg ID",
  title: "Leg ID",
  examples: ["QG~194~~HLP~DPS~2024-06-27T16:55~2024-06-27T19:45"],
})

export const FareGroupCode = Schema.Literal("E", "PE", "B", "F", "PF").annotations({
  description: "Fare group code",
  title: "Fare group code",
  examples: ["E", "PE", "B", "F", "PF"],
  [Skip]: false,
})

export const ScheduleFareInfoParams = Schema.Struct({
  totalPaxs: PaxCount,
})

export const ScheduleFareDetail = Schema.Struct({
  journeyIDS: Schema.Array(JourneyID),
  segmentIDS: Schema.Array(SegmentID),
  agentCode: AgentCode,
  journeySegmentFares: Schema.Array(
    Schema.Struct({
      segmentFares: Schema.Array(
        Schema.Struct({
          fareGroupCode: FareGroupCode,
          fareCode: Schema.String,
          fareBasisCode: Schema.String,
          segmentID: SegmentID,
        }),
      ),
      journeyID: JourneyID,
    }),
  ),
  isCombinedJourneys: Schema.Boolean,
})

export const ScheduleFareDetails = Schema.Array(ScheduleFareDetail)

// FLIGHT:BOOK
//   params:
//     info: FlightBookInfo
//     scheduleFareDetail: ScheduleFareDetails

export const ContactInfo = Schema.Struct({
  title: Schema.String,
  firstName: Schema.String,
  lastName: Schema.String,
  phoneNumber: Schema.String,
  email: Schema.String,
})

export const Pax = Schema.Struct({
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

export const FlightBookInfo = Schema.Struct({
  contactInfo: ContactInfo,
  paxs: Schema.Array(Pax),
})

// FLIGHT:ISSUE
// FLIGHT:CANCEL
// FLIGHT:SYNC
// FLIGHT:FETCH:BOOKING
//   params:
//     bookingID: BookingID

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// PARAMS - HOTEL
// ----------------------------------------------------------------------------

// HOTEL:DESTINATIONS:LIST
//   params:
//     term: Term

export const Term = Schema.String.annotations({
  description: "Search term",
  title: "Search term",
  examples: ["bandung"],
})

// HOTEL:SEARCHBY:DESTINATION
//   params:
//     destinationKey: DestinationKey
//     totalRooms: TotalRooms
//     totalAdults: TotalAdults
//     totalChilds: TotalChilds
//     childrenAges: ChildrenAges
//     checkInDate: DateYMD
//     checkOutDate: DateYMD

export const DestinationKey = Schema.String.annotations({
  description: "Destination key",
  title: "Destination key",
  examples: [""],
})

export const TotalRooms = Schema.Number.annotations({
  description: "Total rooms",
  title: "Total rooms",
  examples: [1],
})

export const TotalAdults = Schema.Number.annotations({
  description: "Total adults",
  title: "Total adults",
  examples: [1],
})

export const TotalChilds = Schema.Number.annotations({
  description: "Total childs",
  title: "Total childs",
  examples: [0],
})

export const ChildrenAges = Schema.Array(Schema.Number).annotations({
  description: "Children ages",
  title: "Children ages",
  examples: [[1, 2]],
})

// HOTEL:FETCH:DETAIL
// params:
//   id: HotelID

export const HotelID = Schema.String.annotations({
  description: "Hotel ID",
  title: "Hotel ID",
  examples: ["ID10018745"],
})

// HOTEL:FETCH:ROOMS
// params:
//   id: HotelID
//   searchKeyData: SearchKey
//   agentCodes: AgentCodes

export const SearchKey = Schema.String.annotations({
  description: "Search key",
  title: "Search key",
  examples: ["2025-02-19+3+2+ID+2.2+0.0+0.0+-+MGH.D.DESTINATION.ID-ESR+true"],
})

// HOTEL:BOOK
// params:
//   id: HotelID
//   roomSelectedData: RoomSelected
//   roomGuestData: RoomGuestData
//   clientReference: ClientReference
//   remarkList: RemarkList

export const RoomSelected = Schema.Struct({
  agentCode: AgentCode,
  hotelID: HotelID,
  roomIDS: Schema.Array(
    Schema.Struct({
      roomNumber: Schema.Number,
      roomPriceKey: Schema.String,
    }),
  ),
})

export const RoomHolder = Schema.Struct({
  firstName: Schema.String,
  lastName: Schema.String,
})

export const RoomGuest = Schema.Struct({
  roomNumber: Schema.Number,
  type: Schema.Literal("ADT", "CHD"),
  title: Schema.String,
  firstName: Schema.String,
  lastName: Schema.String,
})

export const RoomGuestData = Schema.Struct({
  roomHolder: RoomHolder,
  roomGuestList: Schema.Array(RoomGuest),
})

export const ClientReference = Schema.String.annotations({
  description: "Client reference",
  title: "Client reference",
  examples: ["H-20250219-10018745-1"],
})

export const Remark = Schema.String.annotations({
  description: "Remark",
  title: "Remark",
  examples: ["Early Check In", "Late Check Out"],
})

export const RemarkList = Schema.Array(Remark).annotations({
  description: "Remark list",
  title: "Remark list",
  examples: [["Early Check In", "Late Check Out"]],
})

// HOTEL:CANCEL
// HOTEL:ISSUE
// HOTEL:FETCH:BOOKING
//   params:
//     bookingID: BookingID

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// RESULT - FLIGHT
// ----------------------------------------------------------------------------

export const ProcessTime = Schema.Struct({
  request: Schema.Number,
  response: Schema.Number,
  process: Schema.Number,
  unit: Schema.String,
})

export const ResultStatus = Schema.Literal("OK", "ERROR")

export const ResultErrors = Schema.Array(Schema.String)

export const RPCResult = Schema.Struct({
  result: Schema.Struct({
    time: ProcessTime,
    status: ResultStatus,
    errors: ResultErrors.pipe(Schema.optional),
  }),
})

// FLIGHT:SCHEDULE:LIST
//   response:
//     result: RPCResult
//     info: ScheduleInfo
//     schedules: ScheduleResults

export const CarrierCode = Schema.String.annotations({
  description: "Carrier code",
  title: "Carrier code",
  examples: ["QG"],
})

export const FlightNumber = Schema.String.annotations({
  description: "Flight number",
  title: "Flight number",
  examples: ["194"],
})

export const Station = Schema.Struct({
  code: StationCode,
  tz: Schema.Union(Schema.Number, Schema.Literal("?")), // timezone could be unknown
})

export const Journey = Schema.Struct({
  journeyID: JourneyID,
  origin: StationCode,
  destination: StationCode,
  segmentIDS: Schema.Array(SegmentID),
})

export const CarrierInfo = Schema.Struct({
  carrierCode: CarrierCode,
  flightNumber: FlightNumber,
  opSuffix: Schema.optional(Schema.String),
})

export const Segment = Schema.Struct({
  segmentID: SegmentID,
  origin: Station,
  destination: Station,
  arrivalDateTime: DateTimeLocal,
  departureDateTime: DateTimeLocal,
  stopOver: Schema.Number,
  operatingCarrierInfo: CarrierInfo,
  marketingCarrierInfo: CarrierInfo,
  legIDS: Schema.Array(LegID),
})

export const Leg = Schema.Struct({
  legID: LegID,
  origin: Station,
  destination: Station,
  departureDateTime: DateTimeLocal,
  arrivalDateTime: DateTimeLocal,
})

export const ScheduleInfo = Schema.Struct({
  journeys: Schema.Array(Journey),
  segments: Schema.Array(Segment),
  legs: Schema.Array(Leg),
})

export const Offer = Schema.Struct({
  paxType: Schema.String,
  totalFare: Schema.Number,
  agentSellingFare: Schema.Number,
  baseFare: Schema.Number,
  agentServiceFee: Schema.Number,
  agentServiceFeePPN: Schema.Number,
  totalTax: Schema.Number,
  agentIssuedFee: Schema.Number.pipe(Schema.optional),
})

export const AgentOffers = Schema.Struct({
  agentCode: AgentCode,
  supplairCode: Schema.String,
  isSupportNKRI: Schema.Boolean.pipe(Schema.optional),
  offers: Schema.Array(Offer),
})

export const Fare = Schema.Struct({
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

export const SegmentFare = Schema.Struct({
  segmentID: SegmentID,
  fares: Schema.Array(Fare),
})

export const JourneySegmentFare = Schema.Struct({
  journeyID: JourneyID,
  segmentFares: Schema.Array(SegmentFare),
})

export const JourneyType = Schema.Literal("OW", "RT")

export const ScheduleResult = Schema.Struct({
  journeyType: JourneyType,
  journeyIDS: Schema.Array(JourneyID),
  segmentIDS: Schema.Array(SegmentID),
  currencyCode: Schema.NullishOr(Schema.String),
  journeySegmentFares: Schema.Array(JourneySegmentFare),
})

export const ScheduleResults = Schema.Array(ScheduleResult)

// FLIGHT:SCHEDULE:FARE
//   response:
//     result: RPCResult
//     info: ScheduleFareInfo
//     scheduleFareDetail: ScheduleFareDetailResults

export const SegmentResult = Schema.Struct({
  segmentID: SegmentID,
  operatingCarrierInfo: CarrierInfo,
  marketingCarrierInfo: CarrierInfo,
  originCode: StationCode,
  destinationCode: StationCode,
  departureDateTime: DateTimeLocal,
  arrivalDateTime: DateTimeLocal,
  arrivalTz: Schema.Number.pipe(Schema.optional), // FIXME: recheck
  departureTz: Schema.Number.pipe(Schema.optional), // FIXME: recheck
})

export const FareTax = Schema.Struct({
  taxCode: Schema.String,
  taxFare: Schema.Number,
})

export const FareDetail = Schema.Struct({
  paxType: Schema.Literal("ADT", "CHD"),
  price: Schema.Struct({
    baseFare: Schema.Number,
    totalTax: Schema.Number,
    taxs: Schema.Array(FareTax),
    agentIssuedFee: Schema.Number.pipe(Schema.optional),
    agentSellingFare: Schema.Number.pipe(Schema.optional),
    agentServiceFee: Schema.Number.pipe(Schema.optional),
    agentServiceFeePPN: Schema.Number.pipe(Schema.optional),
  }),
})

export const FareSummary = Schema.Struct({
  totalBaseFare: Schema.Number,
  totalTax: Schema.Number,
  totalFare: Schema.Number,
  agentIssuedFee: Schema.Number.pipe(Schema.optional),
  agentSellingFare: Schema.Number.pipe(Schema.optional),
  agentServiceFee: Schema.Number.pipe(Schema.optional),
  agentServiceFeePPN: Schema.Number.pipe(Schema.optional),
})

export const FareSSR = Schema.Struct({
  ssrType: Schema.String,
  ssrCode: Schema.String,
  ssrText: Schema.String,
  ssrPrice: Schema.Number,
  ssrRoute: Schema.String,
  ssrWeight: Schema.String,
  ssrUnit: Schema.String,
})

export const FareSegmentSSR = Schema.Struct({
  segmentID: SegmentID,
  ssrs: Schema.Array(FareSSR),
})

export const ScheduleFareInfo = Schema.Struct({
  totalPaxs: PaxCount,
  segments: Schema.Array(SegmentResult),
})

export const ScheduleFareDetailResult = Schema.Struct({
  journeyIDS: Schema.Array(JourneyID),
  segmentIDS: Schema.Array(SegmentID),
  agentCode: AgentCode,
  supplairCode: Schema.String,
  fareDetails: Schema.Array(FareDetail),
  fareSummary: FareSummary,
  segmentSSRS: Schema.Array(FareSegmentSSR).pipe(Schema.optional),
})

export const ScheduleFareDetailResults = Schema.Array(ScheduleFareDetailResult)

// FLIGHT:BOOK
//   response:
//     result: RPCResult
//     pnrs: BookingPNRs

export const BookingFareSummary = FareSummary.pipe(
  Schema.extend(
    Schema.Struct({
      NTSA: Schema.Number,
      totalPrepaidBaggage: Schema.Number,
      totalNTA: Schema.Number,
      wholesalerFee: Schema.Number,
    }),
  ),
)

export const BookingJourney = Schema.Struct({
  journeyID: JourneyID,
  originCode: StationCode,
  destinationCode: StationCode,
  segmentIDS: Schema.Array(SegmentID),
})

export const BookingPNR = Schema.Struct({
  supplairCode: Schema.String,
  agentCode: AgentCode,
  info: Schema.Struct({
    contactInfo: ContactInfo,
    paxs: Schema.Array(Pax),
    journeys: Schema.Array(BookingJourney),
    segments: Schema.Array(SegmentResult),
  }),
  bookingSummary: BookingFareSummary,
  bookingTimeLimit: DateTimeUTC,
  bookingDateTime: DateTimeUTC,
  scheduleFareDetail: Schema.Array(ScheduleFareDetail),
  bookingID: BookingID,
  bookingStatus: BookingStatus,
  bookingCode: BookingCode,
})

export const BookingPNRs = Schema.Array(BookingPNR)

// FLIGHT:CANCEL
// FLIGHT:ISSUE
// FLIGHT:SYNC
//     result: RPCResult
//     pnrs: BookingPNRs

// ,
// ,
// ,
// ,
// ,

// ----------------------------------------------------------------------------
// RESULT - HOTEL
// ----------------------------------------------------------------------------

