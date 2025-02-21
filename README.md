# Gannet API Documentation

This is documentation repository for the Gannet API.

Gannet API follow [JSON-RPC](https://www.jsonrpc.org/) specification. You can [browse the api here](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/TBIZ-CO-ID/gannet-api/refs/heads/main/pub/openrpc.json) to explore the available methods and its parameters.

This repository contains postman like [collection folder](./pub/bruno) that you can open with [Bruno](https://www.usebruno.com/).

## Request and response examples:

Consult the [example folder](./pub/example) for request and response examples.

- Auth

  - 00 - [Create Auth Token](./pub/example/00_create_token.json)

- Flight

  - 01 - [Flight Schedule List](./pub/example/01_flight_schedule_list.json)
  - 02 - [Flight Schedule Fare](./pub/example/02_flight_schedule_fare.json)
  - 03 - [Flight Book](./pub/example/03_flight_book.json)
  - 04 - [Flight Sync](./pub/example/04_flight_sync.json)
  - 05 - [Flight Cancel](./pub/example/05_flight_cancel.json)
  - 05 - [Flight Issue](./pub/example/05_flight_issue.json)

- Hotel

  - 11 - [Hotel Destinations List](./pub/example/11_hotel_destinations_list.json)
  - 12 - [Hotel Search By Destination](./pub/example/12_hotel_searchby_destination.json)
  - 13 - [Hotel Fetch Detail](./pub/example/13_hotel_fetch_detail.json)
  - 13 - [Hotel Fetch Rooms](./pub/example/13_hotel_fetch_rooms.json)
  - 14 - [Hotel Book](./pub/example/14_hotel_book.json)
  - 15 - [Hotel Fetch Booking](./pub/example/15_hotel_fetch_booking.json)
  - 15 - [Hotel Cancel](./pub/example/15_hotel_cancel.json)
  - 15 - [Hotel Issue](./pub/example/15_hotel_issue.json)

Also see [full flight booking flow](./pub/example/FLIGHT_EXAMPLE_1.jsonc) and [full hotel booking flow](./pub/example/HOTEL_EXAMPLE_1.jsonc) for end-to-end request and response examples.

---

## Method Reference

### Auth

#### "token:create"

- Request Parameters

  - `username` (string, required)
  - `password` (string, required)
  - `signature` (string, required)

- Response

  - `result` (RPCResult, required)
  - `token` (string, required)

---

### Flight

#### "flight:schedule:list"

- Request Parameters

  - `carriers` (Carriers, required)
  - `paxCount` (PaxCount, required)
  - `schedules` (Schedules, required)

- Response

  - `result` (RPCResult, required)
  - `info` (ScheduleInfo, required)
  - `schedules` (ScheduleResults, required)

#### "flight:schedule:fare"

- Request Parameters

  - `info` (ScheduleFareInfoParams, required)
  - `scheduleFareDetail` (ScheduleFareDetails, required)

- Response

  - `result` (RPCResult, required)
  - `info` (ScheduleFareInfo, required)
  - `scheduleFareDetail` (ScheduleFareDetailResults, required)

#### "flight:book"

- Request Parameters

  - `info` (FlightBookInfo, required)
  - `scheduleFareDetail` (ScheduleFareDetails, required)

- Response

  - `booking` (object, required)

#### "flight:sync"

- Request Parameters

  - `bookingID` (string, required)

- Response

  - `booking` (object, required)

#### "flight:cancel"

- Request Parameters

  - `bookingID` (string, required)

- Response

  - `booking` (object, required)

#### "flight:issue"

- Request Parameters

  - `bookingID` (string, required)

- Response

  - `booking` (object, required)

### Hotel

#### "hotel:destinations:list"

- Request Parameters

  - `term` (string, required)

- Response

  - `result` (RPCResult, required)
  - `destinations` (Destination[], required)

#### "hotel:searchby:destination"

- Request Parameters

  - `destinationKey` (string, required)
  - `totalRooms` (number, required)
  - `totalAdults` (number, required)
  - `totalChilds` (number, required)
  - `checkInDate` (string, required)
  - `checkOutDate` (string, required)
  - `childrenAges` (ChildrenAge[], required)

- Response

  - `result` (RPCResult, required)
  - `hotelLists` (HotelResult[], required)

#### "hotel:fetch:detail"

- Request Parameters

  - `id` (string, required)

- Response

  - `result` (RPCResult, required)
  - `hotel` (Hotel, required)

#### "hotel:fetch:rooms"

- Request Parameters

  - `id` (string, required)
  - `searchKeyData` (string, required)
  - `agentCodes` (AgentCode[], required)

- Response

  - `result` (RPCResult, required)
  - `hotelLists` (HotelResult[], required)

#### "hotel:book"

- Request Parameters

  - `roomSelectedData` (RoomSelected[], required)
  - `roomGuestData` (RoomGuestData, required)
  - `clientReference` (ClientReference, required)
  - `remarkList` (Remark[], required)

- Response

  - `result` (RPCResult, required)
  - `booking` (Booking, required)

#### "hotel:fetch:booking"

- Request Parameters

  - `agentCode` (AgentCode, required)
  - `bookingID` (BookingID, required)

- Response

  - `result` (RPCResult, required)
  - `booking` (Booking, required)

#### "hotel:cancel"

- Request Parameters

  - `agentCode` (string, required)
  - `bookingID` (string, required)
  - `remark` (string, required)

- Response

  - `result` (RPCResult, required)
  - `hotelDetailResponse` (Booking, required)

#### "hotel:issue"

- Request Parameters

  - `agentCode` (string, required)
  - `bookingID` (string, required)
  - `remark` (string, required)

- Response

  - `result` (RPCResult, required)
  - `hotelDetailResponse` (Booking, required)

---

## Schema Reference

### `AgentCode` (string)

Simple string type representing an agent code

### `AgentCodes` (array)

- items: `["AG001", "AG002"]` (string array, required)

### `AgentOffers` (object)

- agentCode: `"AG123"` (string, required)
- supplairCode: `"SUP456"` (string, required)
- isSupportNKRI: `true` (boolean, optional)
- offers: `[]` (array, required)

### `BookingCode` (string)

Simple string type representing a booking code

### `BookingFareSummary` (object)

- totalBaseFare: `1000000` (number, required)
- totalTax: `150000` (number, required)
- totalFare: `1150000` (number, required)
- agentIssuedFee: `25000` (number, optional)
- agentSellingFare: `1175000` (number, optional)
- agentServiceFee: `50000` (number, optional)
- agentServiceFeePPN: `5000` (number, optional)
- NTSA: `1230000` (number, required)
- totalPrepaidBaggage: `0` (number, required)
- totalNTA: `1180000` (number, required)
- wholesalerFee: `30000` (number, required)

### `BookingID` (string)

Simple string type representing a booking ID

### `BookingJourney` (object)

- journeyID: `"J123"` (string, required)
- originCode: `"CGK"` (string, required)
- destinationCode: `"DPS"` (string, required)
- segmentIDS: `["S1", "S2"]` (array, required)

### `ContactInfo` (object)

- title: `"Mr"` (string, required)
- firstName: `"John"` (string, required)
- lastName: `"Doe"` (string, required)
- phoneNumber: `"+62812345678"` (string, required)
- email: `"john.doe@email.com"` (string, required)

### `DateTimeLocal` (string)

Date and time in YYYY-MM-DDTHH:mm format at local timezone
Example: `"2024-03-20T10:30"`

### `JourneyType` (string)

Enum values: `["OW", "RT"]`

### `PaxCount` (object)

- ADT: `1` (number, required, minimum: 1)
- CHD: `0` (number, required, minimum: 0)
- INF: `0` (number, required, minimum: 0)

### `Station` (object)

- code: `"CGK"` (string, required)
- tz: `7` (number or "?", required)

### `Fare` (object)

- fareCode: `"ECOBASIC"` (string, required)
- fareBasisCode: `"YBASIC"` (string, required)
- fareGroupCode: `"E"` (string, required)
- seatAvailable: `10` (number, required)
- baggageFree: `{ weight: "20", unit: "KG" }` (object, required)
- canBuyAdditionalBaggage: `true` (boolean, required)
- currencyCode: `"IDR"` (string, required)
- agentOffersFare: `[]` (array, required)

### `FareDetail` (object)

- paxType: `"ADT"` (string, required)
- price: `{ baseFare: 1000000, totalTax: 150000, taxs: [] }` (object, required)

### `FareGroupCode` (string)

Enum values: `["E", "PE", "B", "F", "PF"]`

### `FareSSR` (object)

- ssrType: `"BAGGAGE"` (string, required)
- ssrCode: `"BAG20"` (string, required)
- ssrText: `"Extra Baggage 20KG"` (string, required)
- ssrPrice: `200000` (number, required)
- ssrRoute: `"CGK-DPS"` (string, required)
- ssrWeight: `"20"` (string, required)
- ssrUnit: `"KG"` (string, required)

### `Journey` (object)

- journeyID: `"J123"` (string, required)
- origin: `"CGK"` (string, required)
- destination: `"DPS"` (string, required)
- segmentIDS: `["S1", "S2"]` (array, required)

### `Pax` (object)

- paxType: `"ADT"` (string, required)
- paxID: `"P1"` (string, required)
- nationality: `"ID"` (string, required)
- title: `"Mr"` (string, required)
- firstName: `"John"` (string, required)
- lastName: `"Doe"` (string, required)
- dob: `"1990-01-01"` (string, required)
- freeCheckinBaggage: `[]` (array, optional)

### `RoomGuest` (object)

- roomNumber: `1` (number, required)
- type: `"ADT"` (string, required)
- title: `"Mr"` (string, required)
- firstName: `"John"` (string, required)
- lastName: `"Doe"` (string, required)

### `RoomHolder` (object)

- firstName: `"John"` (string, required)
- lastName: `"Doe"` (string, required)

### `RoomSelected` (object)

- agentCode: `"AG123"` (string, required)
- hotelID: `"HTL123"` (string, required)
- roomIDS: `[{ roomNumber: 1, roomPriceKey: "RPK123" }]` (array, required)

### `Schedule` (object)

- origin: `"CGK"` (string, required)
- destination: `"DPS"` (string, required)
- departureDate: `"2024-03-20"` (string, required)
- returnDate: `"2024-03-25"` (string, optional)

### `Segment` (object)

- segmentID: `"S123"` (string, required)
- origin: `{ code: "CGK", tz: 7 }` (object, required)
- destination: `{ code: "DPS", tz: 8 }` (object, required)
- arrivalDateTime: `"2024-03-20T12:30"` (string, required)
- departureDateTime: `"2024-03-20T10:30"` (string, required)
- stopOver: `0` (number, required)
- operatingCarrierInfo: `{ carrierCode: "GA", flightNumber: "123" }` (object, required)
- marketingCarrierInfo: `{ carrierCode: "GA", flightNumber: "123" }` (object, required)
- legIDS: `["L1"]` (array, required)

### `ProcessTime` (object)

- request: `100` (number, required)
- response: `200` (number, required)
- process: `300` (number, required)
- unit: `"ms"` (string, required)

### `RPCResult` (object)

- result: `{
    time: { request: 100, response: 200, process: 300, unit: "ms" },
    status: "OK",
    errors: []
  }` (object, required)

### `ResultStatus` (string)

Enum values: `["OK", "ERROR"]`

### `UserName` (string)

Api credentials username

### `Password` (string)

Api credentials password

### `Signature` (string)

Api credentials computed signature `md5(username + password + pre-shared-key)`

### `ScheduleFareDetail` (object)

- journeyIDS: `["J123", "J124"]` (array, required)
- segmentIDS: `["S123", "S124"]` (array, required)
- agentCode: `"AG123"` (string, required)
- journeySegmentFares: `[]` (array, required)
- isCombinedJourneys: `false` (boolean, required)

### `ScheduleFareDetailResult` (object)

- journeyIDS: `["J123", "J124"]` (array, required)
- segmentIDS: `["S123", "S124"]` (array, required)
- agentCode: `"AG123"` (string, required)
- supplairCode: `"SUP123"` (string, required)
- fareDetails: `[]` (array, required)
- fareSummary: `{}` (object, required)
- segmentSSRS: `[]` (array, optional)

### `ScheduleFareInfo` (object)

- totalPaxs: `{ ADT: 1, CHD: 0, INF: 0 }` (object, required)
- segments: `[]` (array, required)

### `ScheduleFareInfoParams` (object)

- totalPaxs: `{ ADT: 1, CHD: 0, INF: 0 }` (object, required)

### `ScheduleInfo` (object)

- journeys: `[]` (array, required)
- segments: `[]` (array, required)
- legs: `[]` (array, required)

### `ScheduleResult` (object)

- journeyType: `"OW"` (string, required)
- journeyIDS: `["J123"]` (array, required)
- segmentIDS: `["S123"]` (array, required)
- currencyCode: `"IDR"` (string, optional)
- journeySegmentFares: `[]` (array, required)

### `SearchKey` (string)

Search key identifier

### `SegmentFare` (object)

- segmentID: `"S123"` (string, required)
- fares: `[]` (array, required)

### `SegmentID` (string)

Segment ID identifier

### `SegmentResult` (object)

- segmentID: `"S123"` (string, required)
- operatingCarrierInfo: `{ carrierCode: "GA", flightNumber: "123" }` (object, required)
- marketingCarrierInfo: `{ carrierCode: "GA", flightNumber: "123" }` (object, required)
- originCode: `"CGK"` (string, required)
- destinationCode: `"DPS"` (string, required)
- departureDateTime: `"2024-03-20T10:30"` (string, required)
- arrivalDateTime: `"2024-03-20T12:30"` (string, required)
- arrivalTz: `7` (number, optional)
- departureTz: `7` (number, optional)

### `StationCode` (string)

Station code identifier

### `Term` (string)

Search term

### `TotalAdults` (number)

Total number of adults

### `TotalChilds` (number)

Total number of children

### `TotalRooms` (number)

Total number of rooms

### `Leg` (object)

- legID: `"L123"` (string, required)
- origin: `{ code: "CGK", tz: 7 }` (object, required)
- destination: `{ code: "DPS", tz: 8 }` (object, required)
- departureDateTime: `"2024-03-20T10:30"` (string, required)
- arrivalDateTime: `"2024-03-20T12:30"` (string, required)

### `LegID` (string)

Leg ID identifier

### `BookingPNR` (object)

- supplairCode: `"SUP123"` (string, required)
- agentCode: `"AG123"` (string, required)
- info: `{}` (object, required)
- bookingSummary: `{}` (object, required)
- bookingTimeLimit: `"2024-03-20T23:59"` (string, required)
- bookingDateTime: `"2024-03-20T10:30"` (string, required)
- scheduleFareDetail: `[]` (array, required)
- bookingID: `"B123"` (string, required)
- bookingStatus: `"BOOKED"` (string, required)
- bookingCode: `"BC123"` (string, required)

### `BookingStatus` (string)

Enum values: `["BOOKED", "CANCELLED", "TICKETED"]`

### `Carrier` (string)

Carrier code (e.g., `"QG"`, `"GA"`)

### `CarrierCode` (string)

Carrier code identifier

### `CarrierInfo` (object)

- carrierCode: `"GA"` (string, required)
- flightNumber: `"123"` (string, required)
- opSuffix: `"A"` (string, optional)

### `Carriers` (array)

- items: `["GA", "QG"]` (string array, required)

### `ChildrenAges` (array)

- items: `[5, 8, 10]` (number array)

### `ClientReference` (string)

Client reference identifier

### `DateTimeUTC` (string)

Date and time in YYYY-MM-DDTHH:mm format at UTC timezone
Example: `"2024-03-20T10:30"`

### `DateYMD` (string)

Date in YYYY-MM-DD format
Example: `"2024-03-20"`

### `DestinationKey` (string)

Destination key identifier

### `HotelID` (string)

Hotel ID identifier

### `Remark` (string)

Remark text

### `RemarkList` (array)

- items: `["Remark1", "Remark2"]` (string array, required)

### `ResultErrors` (array)

- items: `["Error1", "Error2"]` (string array, required)
