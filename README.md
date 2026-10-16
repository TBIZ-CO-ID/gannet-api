# Gannet API Documentation

Welcome to the official documentation for the Gannet API - a simple solution for booking flight, hotel, and more.

## 📚 Overview

Gannet API implements the [JSON-RPC 2.0](https://www.jsonrpc.org/) specification, providing a robust and standardized way to handle travel-related operations. The API supports:

- 🛫 Flight bookings, scheduling, and management
- 🏨 Hotel search, booking, and reservation management
- 🔐 Secure authentication and token management

## 🚀 Quick Start

### Interactive API Explorer

Try out the API methods directly in your browser using our [Interactive API Playground](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/TBIZ-CO-ID/gannet-api/refs/heads/main/pub/openrpc.json).

### Development Tools

This repository includes ready-to-use [Bruno](https://www.usebruno.com/) collections in the [./pub/bruno](./pub/bruno) directory. Bruno provides a lightweight, fast, and modern alternative to Postman for API testing and exploration.

## 📖 API Methods Reference

### 🔑 Authentication

| Method         | Description                   | Example                                            |
| -------------- | ----------------------------- | -------------------------------------------------- |
| `token:create` | Generate authentication token | [View Example](./pub/example/00_create_token.json) |

### ✈️ Flight Operations

| Method                 | Description                | Example                                                                                             |
| ---------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| `flight:schedule:list` | List available flights     | [View Example](./pub/example/01_flight_schedule_list.json)                                          |
| `flight:schedule:fare` | Get flight pricing         | [View Example](./pub/example/02_flight_schedule_fare.json)                                          |
| `flight:book`          | Create flight booking      | [View Example](./pub/example/03_flight_book.json)                                                   |
| `flight:sync`          | Synchronize booking status | [View Example](./pub/example/04_flight_sync.json)                                                   |
| `flight:cancel`        | Cancel flight booking      | [View Example](./pub/example/05_flight_cancel.json)                                                 |
| `flight:issue`         | Issue flight tickets       | [Success](./pub/example/05_flight_issue_success.json) · [Error](./pub/example/05_flight_issue.json) |

### 🏨 Hotel Operations

| Method                       | Description             | Example                                                          |
| ---------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `hotel:destinations:list`    | Search destinations     | [View Example](./pub/example/11_hotel_destinations_list.json)    |
| `hotel:searchby:destination` | Find hotels by location | [View Example](./pub/example/12_hotel_searchby_destination.json) |
| `hotel:fetch:detail`         | Get hotel details       | [View Example](./pub/example/13_hotel_fetch_detail.json)         |
| `hotel:fetch:booking`        | Get booking details     | [View Example](./pub/example/14_hotel_fetch_booking.json)        |
| `hotel:fetch:rooms`          | Get available rooms     | [View Example](./pub/example/15_hotel_fetch_rooms.json)          |
| `hotel:room:checkprice`      | Verify room pricing     | [View Example](./pub/example/16_hotel_room_checkprice.json)      |
| `hotel:book`                 | Create hotel booking    | [View Example](./pub/example/17_hotel_book.json)                 |
| `hotel:cancel`               | Cancel hotel booking    | [View Example](./pub/example/18_hotel_cancel.json)               |
| `hotel:issue`                | Issue hotel voucher     | [View Example](./pub/example/19_hotel_issue.json)                |

## 🔄 Workflow Guides

### Flight Booking Workflow

1. **Search Phase**
   - Search flight schedules using `flight:schedule:list`
   - Verify pricing with `flight:schedule:fare`

2. **Booking Phase**
   - Create booking using `flight:book`
   - Monitor booking status with `flight:sync`

3. **Completion Phase**
   Either:
   - Issue tickets using `flight:issue`
   - Or cancel booking using `flight:cancel`

[View Complete Flight Booking Example](./pub/example/FLIGHT_EXAMPLE_1.jsonc)

### Hotel Booking Workflow

1. **Search Phase**
   - Find destinations using `hotel:destinations:list`
   - Search hotels using `hotel:searchby:destination`
   - Get detailed information with `hotel:fetch:detail`
   - Check room availability using `hotel:fetch:rooms`

2. **Room Selection**
   Understanding `roomCombinationType` (passed through unchanged from the hotel supplier, so treat it as an open string — see [`RoomCombinationType`](#roomcombinationtype-string)):
   - `FixedRoomCombination`: Must select specific room combinations (the value seen in the examples)
   - `FreeRoomCombination`: Flexible room selection
   - `IdenticalRoomCombination`: All rooms must be same type
   - `FlexibleRoomCombination`: Listed in an earlier version of the OpenRPC schema

   Send one `roomIDS` entry per room, each with its own `roomNumber`; the same `roomID` may be repeated for several rooms of the same type.

3. **Price Verification**
   - Verify current room pricing using `hotel:room:checkprice`
   - This ensures prices haven't changed before booking

4. **Booking Phase**
   - Create booking using `hotel:book`
   - Monitor status with `hotel:fetch:booking`

5. **Completion Phase**
   Either:
   - Issue voucher using `hotel:issue`
   - Or cancel booking using `hotel:cancel`

[View Complete Hotel Booking Example](./pub/example/HOTEL_EXAMPLE_1.jsonc)

## 💡 Integration Best Practices

1. **Performance Optimization**
   - Enable HTTP compression for all requests
   - Consider implementing response caching for destination lists
   - Use separate requests per supplier for faster hotel searches

2. **Error Handling**
   - Always check `result.status` in responses
   - Implement proper retry mechanisms for transient failures

3. **Booking Management**
   - Implement automatic booking synchronization
   - Set up monitoring for booking deadlines
   - Handle cancellation deadlines proactively

## 🔒 Security Considerations

1. **Token Management**
   - Store tokens securely
   - Implement token refresh mechanism
   - Never expose tokens in client-side code

2. **Request Signing**
   - Always include proper signatures
   - Use secure random generators for nonces
   - Implement timestamp validation

## 🆘 Support

For technical support or questions:

- Check our example implementations
- Review the [full API schema](./pub/schemas.json)
- Contact our support team (contact details in your service agreement)

---

For detailed schema definitions and data types, refer to the [Schema Reference](#schema-reference) section below.

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
  - 05 - [Flight Issue (success)](./pub/example/05_flight_issue_success.json)
  - 05 - [Flight Issue (error)](./pub/example/05_flight_issue.json)

- Hotel

  - 11 - [Hotel Destinations List](./pub/example/11_hotel_destinations_list.json)
  - 12 - [Hotel Search By Destination](./pub/example/12_hotel_searchby_destination.json)
  - 13 - [Hotel Fetch Detail](./pub/example/13_hotel_fetch_detail.json)
  - 14 - [Hotel Fetch Booking](./pub/example/14_hotel_fetch_booking.json)
  - 15 - [Hotel Fetch Rooms](./pub/example/15_hotel_fetch_rooms.json)
  - 16 - [Hotel Room Check Price](./pub/example/16_hotel_room_checkprice.json)
  - 17 - [Hotel Book](./pub/example/17_hotel_book.json)
  - 18 - [Hotel Cancel](./pub/example/18_hotel_cancel.json)
  - 19 - [Hotel Issue](./pub/example/19_hotel_issue.json)

Also see [full flight booking flow](./pub/example/FLIGHT_EXAMPLE_1.jsonc) and [full hotel booking flow](./pub/example/HOTEL_EXAMPLE_1.jsonc) for end-to-end request and response examples.

---

## Method Reference

### Auth

#### "token:create"

- Request Parameters
  - `username` ([`UserName`](#username-string), required) - Api credentials username
  - `password` ([`Password`](#password-string), required) - Api credentials password
  - `signature` ([`Signature`](#signature-string), required) - Api credentials computed signature
  - `profile` (Array of [`AgentProfile`](#agentprofile-object), optional) - Per-agent settings for flight methods, stored in the token. Each entry's `policy` (and optional `policyFlight`) determines the agent fee and platform fee fields added to flight prices in responses made with this token. The agent codes listed here are also used to activate any additional agents configured for the account.
  - `profileHotel` (Array of [`AgentProfile`](#agentprofile-object), optional) - Per-agent settings for hotel methods, stored in the token. Each entry's `policy` determines the agent fee and platform fee fields added to hotel room prices. `policyFlight` is not used here.

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `token` (string, required)

### Flight

#### "flight:schedule:list"

- Request Parameters
  - `carriers` ([`Carriers`](#carriers-string), optional) - Array of carrier codes. When omitted or empty, all carriers available to your agents are searched.
  - `paxCount` ([`PaxCount`](#paxcount-object), required) - Passenger counts
  - `schedules` (Array of [`Schedule`](#schedule-object), required) - Flight schedules

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `info` ([`ScheduleInfo`](#scheduleinfo-object), required)
  - `schedules` (Array of [`ScheduleResult`](#scheduleresult-object), required)

#### "flight:schedule:fare"

- Request Parameters
  - `info` ([`ScheduleFareInfoParams`](#schedulefareinfoparams-object), required)
  - `scheduleFareDetail` ([`ScheduleFareDetails`](#schedulefaredetails-object), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `info` ([`ScheduleFareInfo`](#schedulefareinfo-object), required)
  - `scheduleFareDetail` (Array of [`ScheduleFareDetailResult`](#schedulefaredetailresult-object), required)

#### "flight:book"

- Request Parameters
  - `info` ([`FlightBookInfo`](#flightbookinfo-object), required)
  - `scheduleFareDetail` ([`ScheduleFareDetails`](#schedulefaredetails-object), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `pnrs` (Array of [`BookingPNR`](#bookingpnr-object), required)

#### "flight:sync", "flight:cancel", "flight:issue"

- Request Parameters
  - `bookingID` ([`BookingID`](#bookingid-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `pnrs` (Array of [`BookingPNR`](#bookingpnr-object), required)

- Notes
  - All three methods only act on a booking whose current status is `BOOKED`.
  - `flight:issue`: on success the PNR has `bookingStatus` `TICKETED` and carries the ticket numbers in `info.ticketNumbers` (Array of [`PaxTicketNumbers`](#paxticketnumbers-object)). This is the only method that returns ticket numbers. See the [success example](./pub/example/05_flight_issue_success.json).
  - `flight:sync`: syncing a booking that has already been issued (`TICKETED`) or cancelled returns an `ERROR` result (`"Booking Status of PNR restricted to sync"`). In the sync response each passenger's `paxID` is derived from the passenger type and names as stored by the airline (e.g. `ADTJOHNDOE`), not the `paxID` sent in `flight:book`. The synced PNR replaces the stored one, so a later `flight:issue` reports ticket numbers against these derived `paxID` values.
  - `flight:cancel`: the cancelled PNR has `bookingStatus` `CANCELLED`, or `CANCELDELAYED` when the supplier has accepted the cancellation but will complete it later.

### Hotel

#### "hotel:destinations:list"

- Request Parameters
  - `term` ([`Term`](#term-string), required) - Search term

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `destinations` (Array of Destination, required)

#### "hotel:searchby:destination"

- Request Parameters
  - `destinationKey` ([`DestinationKey`](#destinationkey-string), required)
  - `totalRooms` (number, required)
  - `totalAdults` (number, required) - Total adults, spread across the rooms
  - `totalChilds` (number, required) - Total children, spread across the rooms. Ignored when `childrenAges` is not empty
  - `totalInfants` (number, optional) - Total infants, spread across the rooms. Defaults to 0
  - `checkInDate` ([`DateYMD`](#dateymd-string), required)
  - `checkOutDate` ([`DateYMD`](#dateymd-string), required)
  - `childrenAges` ([`ChildrenAges`](#childrenages-number), optional) - Children ages per room, e.g. `[[5, 8], []]` for 2 rooms

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `searchKeyData` ([`SearchKeyData`](#searchkeydata-string), required) - Pass to `hotel:fetch:rooms`
  - `hotelLists` (Array of [`HotelResult`](#hotelresult-object), required)

- Occupancy
  - Adults, children and infants are given as totals and spread across `totalRooms`. When a total is a multiple of `totalRooms` it is split evenly; otherwise the per-room counts are rounded up, so the occupancy searched can be larger than the requested total (e.g. 3 adults in 2 rooms are searched as 2 + 2, and 1 child in 2 rooms as 1 + 1).
  - To place children per room, use `childrenAges` (see [`ChildrenAges`](#childrenages-number)). When it is omitted or empty, `totalChilds` is spread across the rooms and every child's age is taken as 8.
  - The resulting per-room occupancy is carried in `searchKeyData` and reused by `hotel:fetch:rooms`.

#### "hotel:fetch:detail"

- Request Parameters
  - `id` ([`HotelID`](#hotelid-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelInformation` ([`HotelInformation`](#hotelinformation-object), required)

#### "hotel:fetch:rooms"

- Request Parameters
  - `id` ([`HotelID`](#hotelid-string), required)
  - `searchKeyData` (string, required)
  - `agentCodes` (Array of [`AgentCode`](#agentcode-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelRoomInformation` (Array of [`HotelRoomInformation`](#hotelroominformation-object), required)

#### "hotel:room:checkprice"

- Request Parameters
  - `roomSelectedData` (Array of [`RoomSelected`](#roomselected-object), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelRoomCheckPriceResponse` ([`HotelRoomCheckPriceResponse`](#hotelroomcheckpriceresponse-object), required)

#### "hotel:book"

- Request Parameters
  - `roomSelectedData` (Array of [`RoomSelected`](#roomselected-object), required)
  - `roomGuestData` ([`RoomGuestData`](#roomguestdata-object), required)
  - `clientReference` ([`ClientReference`](#clientreference-string), required) - A request without `clientReference` returns an `ERROR` result
  - `remarkList` ([`RemarkList`](#remarklist-string), optional)
  - `doIssueImmediately` (boolean, optional) - When `true`, the supplier is asked to issue (voucher) the booking as part of this request, instead of leaving it for a separate `hotel:issue` call. Check `vendorInformation.voucherStatus` in the response. Any other value, or omitting it, only books.

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelBookingResponses` (Array of [`HotelBookingResponse`](#hotelbookingresponse-object), required)

#### "hotel:fetch:booking", "hotel:cancel", "hotel:issue"

- Request Parameters
  - `agentCode` ([`AgentCode`](#agentcode-string), required)
  - `bookingID` ([`BookingID`](#bookingid-string), required)
  - `remark` (string, optional) - Only for cancel/issue

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelDetailResponse` ([`HotelBookingResponse`](#hotelbookingresponse-object)) - `hotel:fetch:booking`
  - `hotelCancelResponse` ([`HotelBookingResponse`](#hotelbookingresponse-object)) - `hotel:cancel`
  - `hotelIssueResponse` ([`HotelBookingResponse`](#hotelbookingresponse-object)) - `hotel:issue`

---

## Schema Reference

### Common Types

#### `DateYMD` (string)

Date in YYYY-MM-DD format

#### `DateTimeLocal` (string)

Date and time in YYYY-MM-DDTHH:mm format at local timezone

#### `DateTimeUTC` (string)

Date and time in YYYY-MM-DDTHH:mm format at UTC timezone

#### `AgentCode` (string)

Agent code identifier

#### `AgentCodes` (string[])

Array of agent codes

#### `BookingID` (string)

Booking identifier

#### `BookingCode` (string)

Booking code identifier

#### `BookingStatus` (string)

Values returned by the server:

- "BOOKED" - Booked (held), not yet ticketed
- "TICKETED" - Tickets issued; returned by a successful `flight:issue`
- "CANCELLED" - Returned by `flight:cancel`
- "CANCELDELAYED" - Returned by `flight:cancel` when the supplier has accepted the cancellation but will complete it later

Any other status reported by the supplier is passed through unchanged.

#### `SupplairCode` (string)

Supplier airline code identifier

#### `SupplierCode` (string)

Supplier code identifier (e.g., "MGH")

#### `VendorCode` (string)

Vendor code identifier (e.g., "QILIN")

### Response Types

#### `RPCResult` (object)

- `result` (object, required)
  - `time` (ProcessTime, required)
  - `status` (ResultStatus, required)
  - `errors` (ResultErrors, optional)

#### `ProcessTime` (object)

- `request` (number, required)
- `response` (number, required)
- `process` (number, required)
- `unit` ("ms", required)

#### `ResultStatus` (enum)

Values: "OK" | "ERROR"

#### `ResultErrors` (string[])

Array of error messages

#### `SearchKeyData` (string)

Encrypted search key data used for hotel room searches

### Flight Types

#### `JourneyType` (enum)

Values: "OW" (One Way) | "RT" (Round Trip)

#### `JourneyID` (string)

Journey identifier (e.g., "QG194~HLP~DPS")

#### `SegmentID` (string)

Segment identifier (e.g., "QG~194~~HLP~DPS~2025-04-01T17:05~2025-04-01T19:55")

#### `LegID` (string)

Leg identifier (e.g., "HLP~DPS~2025-04-01T17:05~2025-04-01T19:55")

#### `PaxType` (enum)

Passenger type. Values: "ADT" (Adult) | "CHD" (Child) | "INF" (Infant)

#### `PaxCount` (object)

- `ADT` (number, required) - Adult count, min: 1
- `CHD` (number, required) - Child count, min: 0
- `INF` (number, required) - Infant count, min: 0

#### `Schedule` (object)

- `origin` (StationCode, required)
- `destination` (StationCode, required)
- `departureDate` (DateYMD, required)
- `returnDate` (DateYMD, optional)

#### `Journey` (object)

- `journeyID` (string, required)
- `origin` (StationCode, required)
- `destination` (StationCode, required)
- `segmentIDS` (string[], required)

#### `Segment` (object)

- `segmentID` (SegmentID, required)
- `origin` (Station, required)
- `destination` (Station, required)
- `arrivalDateTime` (DateTimeLocal, required)
- `departureDateTime` (DateTimeLocal, required)
- `stopOver` (number, required)
- `operatingCarrierInfo` (CarrierInfo, required)
- `marketingCarrierInfo` (CarrierInfo, required)
- `legIDS` (LegID[], required)

#### `SegmentResult` (object)

Used in schedule fare info response

- `segmentID` (SegmentID, required)
- `operatingCarrierInfo` (CarrierInfo, required)
- `marketingCarrierInfo` (CarrierInfo, required)
- `originCode` (StationCode, required)
- `destinationCode` (StationCode, required)
- `departureDateTime` (DateTimeLocal, required)
- `arrivalDateTime` (DateTimeLocal, required)
- `arrivalTz` (number, optional) - Timezone offset for arrival
- `departureTz` (number, optional) - Timezone offset for departure

#### `Leg` (object)

- `legID` (LegID, required)
- `origin` (Station, required)
- `destination` (Station, required)
- `departureDateTime` (DateTimeLocal, required)
- `arrivalDateTime` (DateTimeLocal, required)

#### `ContactInfo` (object)

- `title` (string, required)
- `firstName` (string, required)
- `lastName` (string, required)
- `phoneNumber` (string, required)
- `email` (string, required)

#### `Pax` (object)

- `paxType` (PaxType, required)
- `paxID` (string, required) - PNRs returned by `flight:sync`, and by `flight:issue` after a sync, carry a `paxID` derived from the passenger type and names (e.g. "ADTJOHNDOE") instead of the one sent in `flight:book`
- `paxRefID` (string, optional) - Reference ID for passenger in booking. For an `INF` passenger in `flight:book`: the `paxID` of the adult the infant travels with
- `nationality` (string, required) - ISO country code (e.g., "ID"). Must not be empty for `CHD` and `INF`
- `title` (string, required) - `ADT`: "MR", "MRS" or "MS". `CHD` and `INF`: "MSTR" or "MISS" ("MR" and "MRS" sent for a child or infant are converted to "MSTR" and "MISS"). Any other combination is rejected
- `firstName` (string, required)
- `lastName` (string, required)
- `dob` (DateYMD, required) - Date of birth. Must not be empty for `CHD` and `INF`
- `identityNumber` (string, optional) - National identity number. Forwarded to the airline only when `nationality` is "ID"
- `passport` ([`Passport`](#passport-object), optional) - Forwarded to the airline only when `passport.number` is not empty
- `staffIdentityNumber` (string, optional) - Staff identity number, forwarded to the airline as a passenger document when not empty
- `freeCheckinBaggage` (FreeCheckinBaggage[], optional)

#### `Passport` (object)

- `number` (string, required) - Passport number
- `countryOfIssuer` (string, optional) - ISO country code of the issuing country
- `expired` (DateYMD, required) - Passport expiry date

#### `FreeCheckinBaggage` (object)

- `baggageRoute` (string, required) - Route code (e.g., "HLP-DPS")
- `baggageWeight` (string, required) - Weight value (e.g., "15")
- `baggageUnit` (string, required) - Weight unit (e.g., "KG")

### Booking Types

#### `BookingPNR` (object)

- `supplairCode` (SupplairCode, required)
- `agentCode` (AgentCode, required)
- `info` (BookingInfo, required)
- `bookingSummary` (BookingFareSummary, required)
- `bookingTimeLimit` (DateTimeUTC, required)
- `bookingDateTime` (DateTimeUTC, required)
- `scheduleFareDetail` (ScheduleFareDetailResult[], required)
- `bookingID` (BookingID, required)
- `bookingStatus` (BookingStatus, required)
- `bookingCode` (BookingCode, required)

#### `BookingInfo` (object)

- `contactInfo` (ContactInfo, required)
- `paxs` (Pax[], required)
- `journeys` (BookingJourney[], required)
- `segments` (SegmentResult[], required)
- `ticketNumbers` ([`PaxTicketNumbers`](#paxticketnumbers-object)[], optional) - Returned only by a successful `flight:issue`

#### `PaxTicketNumbers` (object)

Ticket numbers of one passenger, returned by `flight:issue`. A passenger for whom the supplier returned no ticket is not listed.

- `paxID` (string, required) - `paxID` of the passenger in the stored PNR (`info.paxs[].paxID`): the one sent in `flight:book`, or the derived one (e.g. "ADTJOHNDOE") if the booking was synced before issuing
- `segmentTicketNumbers` ([`SegmentTicketNumber`](#segmentticketnumber-object)[], required)

#### `SegmentTicketNumber` (object)

- `ticketNumber` (string, nullable, required) - Ticket number. May be `null` when the supplier does not return a ticket number
- `segmentIDS` (SegmentID[], required) - Segments covered by this ticket

#### `BookingJourney` (object)

- `journeyID` (JourneyID, required)
- `originCode` (StationCode, required)
- `destinationCode` (StationCode, required)
- `segmentIDS` (SegmentID[], required)

#### `BookingFareSummary` (object)

- `totalBaseFare` (number, required)
- `totalTax` (number, required)
- `totalFare` (number, required)
- `agentIssuedFee` (number, optional)
- `agentSellingFare` (number, optional)
- `agentServiceFee` (number, optional)
- `agentServiceFeePPN` (number, optional)
- `NTSA` (number, required)
- `totalPrepaidBaggage` (number, required)
- `totalNTA` (number, required)
- `wholesalerFee` (number, required)
- `platformFeeAmount` (number, optional) - Sum of `scheduleFareDetail[].fareSummary.platformFeeAmount`. Present only when greater than 0
- `discountCBDAmount` (number, optional) - Sum of `scheduleFareDetail[].fareSummary.discountCBDAmount`. Present only when greater than 0
- `TOPSellingFare` (number, optional) - Sum of `scheduleFareDetail[].fareSummary.TOPSellingFare`. Present only when greater than 0

### Fare Types

#### `Fare` (object)

- `fareCode` (string, required)
- `fareBasisCode` (string, required)
- `fareGroupCode` (FareGroupCode, required)
- `seatAvailable` (number, required)
- `baggageFree` (BaggageFree, required)
- `canBuyAdditionalBaggage` (boolean, required)
- `currencyCode` (string, required)
- `agentOffersFare` (AgentOffers[], required)

#### `BaggageFree` (object)

- `weight` (string, required) - Weight value (e.g., "15")
- `unit` (string, required) - Weight unit (e.g., "KG")

#### `FareGroupCode` (enum)

Fare class codes. Values:

- "E" - Economy
- "PE" - Premium Economy
- "B" - Business
- "F" - First
- "PF" - Premium First

#### `AgentOffers` (object)

- `agentCode` (AgentCode, required)
- `supplairCode` (SupplairCode, required)
- `isSupportNKRI` (boolean, optional)
- `offers` (Offer[], required)

#### `Offer` (object)

- `paxType` (PaxType, required)
- `baseFare` (number, required)
- `totalTax` (number, required)
- `totalFare` (number, required)
- `agentServiceFee` (number, required)
- `agentServiceFeePPN` (number, required)
- `agentIssuedFee` (number, optional)
- `agentSellingFare` (number, required)
- `platformFee` (number, optional) - Platform fee rate as a fraction (e.g. 0.02 = 2%), from the token `profile`
- `platformFeeAmount` (number, optional) - `totalFare` x `platformFee`, rounded
- `discountCBD` (number, optional) - CBD discount rate as a fraction, from the token `profile`
- `discountCBDAmount` (number, optional) - `totalFare` x `discountCBD`, rounded. Informational; not subtracted from `TOPSellingFare`
- `TOPSellingFare` (number, optional) - `agentSellingFare` + `platformFeeAmount`

#### `FareDetail` (object)

- `paxType` (PaxType, required)
- `price` (FarePrice, required)
- `fareComponent` (FareComponent[], optional)
- `paxRefID` (string, optional) - Reference to passenger ID

#### `FarePrice` (object)

- `baseFare` (number, required)
- `taxs` (FareTax[], required)
- `totalTax` (number, required)
- `totalPublishFare` (number, optional)
- `agentServiceFee` (number, optional)
- `agentServiceFeePPN` (number, optional)
- `agentIssuedFee` (number, optional)
- `agentSellingFare` (number, optional)
- `platformFee` (number, optional) - Platform fee rate as a fraction (e.g. 0.02 = 2%), from the token `profile`
- `platformFeeAmount` (number, optional) - `totalPublishFare` x `platformFee`, rounded
- `discountCBD` (number, optional) - CBD discount rate as a fraction, from the token `profile`
- `discountCBDAmount` (number, optional) - `totalPublishFare` x `discountCBD`, rounded. Informational; not subtracted from `TOPSellingFare`
- `TOPSellingFare` (number, optional) - `agentSellingFare` + `platformFeeAmount`

#### `FareComponent` (object)

- `fareGroupCode` (FareGroupCode, required)
- `fareCode` (string, required)
- `fareBasisCode` (string, required)
- `segmentID` (SegmentID, required)

#### `FareTax` (object)

- `taxCode` (string, required) - Tax code (e.g., "SC", "IWJR", "PSC", "VAT", "VS")
- `taxFare` (number, required)

#### `FareSummary` (object)

- `totalBaseFare` (number, required)
- `totalTax` (number, required)
- `totalFare` (number, required)
- `totalPrepaidBaggage` (number, optional)
- `agentServiceFee` (number, optional)
- `agentServiceFeePPN` (number, optional)
- `agentIssuedFee` (number, optional)
- `agentSellingFare` (number, optional)
- `platformFeeAmount` (number, optional) - Sum of `fareDetails[].price.platformFeeAmount`
- `discountCBDAmount` (number, optional) - Sum of `fareDetails[].price.discountCBDAmount`
- `TOPSellingFare` (number, optional) - Sum of `fareDetails[].price.TOPSellingFare`

#### `FareSSR` (object)

Special Service Request for baggage

- `ssrType` (string, required) - Type of SSR (e.g., "BAGGAGE")
- `ssrCode` (string, required)
- `ssrText` (string, required)
- `ssrPrice` (number, required)
- `ssrRoute` (string, required)
- `ssrWeight` (string, required)
- `ssrUnit` (string, required)

#### `FareSegmentSSR` (object)

- `segmentID` (SegmentID, required)
- `ssrs` (FareSSR[], required)

#### `JourneySegmentFare` (object)

- `journeyID` (JourneyID, required)
- `segmentFares` (SegmentFare[], required)

#### `SegmentFare` (object)

- `segmentID` (SegmentID, required)
- `fares` (Fare[], required)

#### `SegmentFareSelection` (object)

Used in schedule fare request/booking params

- `fareGroupCode` (FareGroupCode, required)
- `fareCode` (string, required)
- `fareBasisCode` (string, required)
- `segmentID` (SegmentID, required)

### Carrier Types

#### `Carrier` (string)

Carrier code (e.g., "QG", "GA")

#### `CarrierCode` (string)

Carrier/airline code identifier

#### `FlightNumber` (string)

Flight number (e.g., "194")

#### `CarrierInfo` (object)

- `carrierCode` (CarrierCode, required)
- `flightNumber` (FlightNumber, required)
- `opSuffix` (string, optional)

#### `Carriers` (string[])

Array of carrier codes

### Station Types

#### `Station` (object)

- `code` (StationCode, required)
- `tz` (number | "?", required)

#### `StationCode` (string)

Station code identifier

### Hotel Types

#### `HotelID` (string)

Hotel ID identifier (hashed/encrypted ID)

#### `Destination` (object)

- `destinationName` (string, required) - Destination name (e.g., "Malang")
- `destinationText` (string, required) - Full destination text (e.g., "Malang, Indonesia")
- `destinationKey` (DestinationKey, required) - Encrypted destination key for searches
- `countryCode` (string, required) - ISO country code (e.g., "ID")

#### `HotelResult` (object)

Hotel search result from `hotel:searchby:destination`

- `id` (HotelID, required)
- `name` (string, required)
- `description` (string, required)
- `address` (string, required)
- `destinationName` (string, required)
- `countryName` (string, required)
- `countryCode` (string, required)
- `star` (number, required) - Hotel star rating (1-5)
- `latitude` (number, required)
- `longitude` (number, required)
- `pictureUrl` (string, nullable)
- `agentSellingPrice` (AgentSellingPrice[], required)

#### `AgentSellingPrice` (object)

- `agentCode` (AgentCode, required)
- `vendorCode` (VendorCode, required)
- `lowestPrice` (LowestPrice, required)

#### `LowestPrice` (object)

- `currencyCode` (string, required) - e.g., "IDR"
- `totalPrice` (number, required)
- `supplierCode` (SupplierCode, required)
- `typeOfRate` (string, required) - e.g., "AG"

#### `HotelInformation` (object)

Hotel detail from `hotel:fetch:detail`

- `id` (HotelID, required)
- `name` (string, required)
- `description` (string, required)
- `address` (string, required)
- `destinationName` (string, required)
- `countryName` (string, required)
- `countryCode` (string, required)
- `star` (number, required)
- `latitude` (number, required)
- `longitude` (number, required)
- `pictureUrls` (string[], required)
- `phoneNumber` (string, optional)
- `fax` (string, optional)
- `websiteUrl` (string, optional)
- `checkinInfo` (string, required) - Check-in time (e.g., "14:00:00")
- `checkoutInfo` (string, required) - Check-out time (e.g., "12:00:00")
- `facilityList` (string[], required)
- `roomFacilityList` (string[], required)
- `amenityList` (string[], required)
- `attractionList` (string[], required)
- `locationList` (string[], required)
- `typeOfRate` (string, required)
- `supplierCode` (SupplierCode, required)

#### `HotelRoomInformation` (object)

Room information from `hotel:fetch:rooms`

- `hotelID` (HotelID, required)
- `agentCode` (AgentCode, required)
- `supplierCode` (SupplierCode, required)
- `checkInDate` (DateYMD, required)
- `checkOutDate` (DateYMD, required)
- `numberOfNights` (number, required)
- `totalNumberOfRooms` (number, required)
- `roomCombinationType` (RoomCombinationType, required)
- `roomIndexCombinationList` (RoomIndexCombination[], required)
- `roomInformations` (RoomInformation[], required)
- `typeOfRate` (string, required)

#### `RoomCombinationType` (string)

The value is passed through unchanged from the hotel supplier, so treat it as an open string. Known values:

- "FixedRoomCombination" - Must select specific room combinations (the value seen in the examples)
- "FreeRoomCombination" - Flexible room selection
- "IdenticalRoomCombination" - All rooms must be same type
- "FlexibleRoomCombination" - Listed in an earlier version of the OpenRPC schema

#### `RoomIndexCombination` (object)

- `numberOfRooms` (number, required)
- `roomNumber` (number, required)
- `roomGroup` (number, required)
- `roomIndexSequence` (number[], required) - Array of valid room indices

#### `RoomInformation` (object)

- `roomIndex` (number, required)
- `roomID` (string, required) - Room identifier/key
- `roomName` (string, required)
- `roomDescription` (string, required)
- `roomSize` (string, required)
- `roomMaxOccupancy` (number, required)
- `roomBoardCode` (string, required) - e.g., "RO" (Room Only), "BDBF" (Breakfast)
- `roomBoardInclusion` (string, required) - e.g., "Room Only", "Breakfast"
- `roomPrice` (RoomPrice, required)
- `roomBed` (RoomBed, required)
- `roomAmenities` (string[], required)
- `roomSupplementList` (object[], required)
- `roomCancellationPolicyList` (RoomCancellationPolicyList, required)
- `nightlyRates` (number[], optional) - Price per night breakdown

#### `RoomPrice` (object)

- `currencyCode` (string, required)
- `totalPrice` (number, required)
- `supplierNTA` (number, optional) - Supplier net amount
- `agentServiceFee` (number, optional)
- `agentServiceFeePPN` (number, optional)
- `agentIssuedFee` (number, optional)
- `agentSellingFare` (number, optional)
- `TOPSellingFare` (number, optional) - `agentSellingFare` + `platformFeeAmount`
- `platformFee` (number, optional) - Platform fee rate as a fraction (e.g. 0.02 = 2%), from the token `profileHotel`
- `platformFeeAmount` (number, optional) - `totalPrice` x `platformFee`, rounded
- `discountCBD` (number, optional) - CBD discount rate as a fraction, from the token `profileHotel`
- `discountCBDAmount` (number, optional) - Informational; not subtracted from `TOPSellingFare`

#### `RoomBed` (object)

- `bedCount` (string, required) - Number of beds or "N/A"
- `bedType` (string, required) - Bed type or "N/A"
- `bedText` (string, required) - Bed description or "N/A"

#### `RoomCancellationPolicyList` (object)

- `isCancellable` (boolean, required)
- `lastCancellationDeadline` (string, required) - ISO datetime
- `defaultPolicy` (string, required)
- `autoCancellationText` (string, required)
- `textualPolicyList` (string[], required)
- `noShowCharges` (object[], required)
- `roomCancellationCharges` (RoomCancellationCharge[], required)

#### `RoomCancellationCharge` (object)

- `fromDate` (string, required) - ISO datetime
- `toDate` (string, required) - ISO datetime
- `chargeType` (string, required) - e.g., "Percentage"
- `currencyCode` (string, required)
- `chargeAmount` (number, required) - Charge percentage or amount

#### `RoomSelected` (object)

- `agentCode` (AgentCode, required)
- `hotelID` (HotelID, required)
- `roomIDS` (RoomID[], required) - One entry per room number, each sent to the supplier as-is (e.g. for 2 rooms: `[{roomNumber: 1, roomID: X}, {roomNumber: 2, roomID: X}]`)

#### `RoomID` (object)

- `roomNumber` (number, required) - Room number in booking
- `roomID` (string, required) - Room identifier from room search. The same `roomID` may be repeated for several room numbers (e.g. two rooms of the same type)
- `roomPriceKey` (string, optional) - Room price key

#### `RoomHolder` (object)

Contact person for hotel booking

- `firstName` (string, required)
- `lastName` (string, required)
- `email` (string, optional)
- `phone` (string, optional)

#### `RoomGuest` (object)

- `roomNumber` (number, required) - Room number (1-indexed)
- `type` (RoomGuestType, required)
- `title` (string, required) - e.g., "MR", "MRS", "MS"
- `firstName` (string, required)
- `lastName` (string, required)
- `age` (number, optional) - Guest age, forwarded to the supplier when present (e.g. for children)

#### `RoomGuestType` (enum)

Values: "ADT" (Adult) | "CHD" (Child)

#### `RoomGuestData` (object)

- `roomHolder` (RoomHolder, required)
- `roomGuestList` (RoomGuest[], required)

#### `SupplierInformation` (object)

- `supplierCode` (SupplierCode, required)
- `typeOfRate` (string, required)
- `supplierTripId` (string, optional)
- `supplierUpstreamVoucherCode` (string, optional)
- `supplierUpstreamRef` (string, optional)
- `supplierUpstreamConfirmationCode` (string, optional)
- `supplierConfirmationCode` (string, optional)
- `creationDate` (string, nullable)
- `creationUser` (string, nullable)
- `currencyCode` (string, nullable)
- `pendingAmount` (number, nullable)
- `invoiceCompany` (string, nullable)
- `modificationPolicies` (object, nullable)

#### `VendorInformation` (object)

- `vendorCode` (VendorCode, required)
- `locatorCode` (string, required)
- `toSupplierRef` (string, required)
- `fromClientRef` (string, required)
- `bookedAt` (string, required) - ISO datetime
- `voucheredAt` (string, nullable)
- `cancelledAt` (string, nullable)
- `bookingStatus` (string, required) - e.g., "CONFIRMED"
- `voucherStatus` (string, nullable) - e.g., "VOUCHERED"
- `cancelStatus` (string, nullable) - e.g., "CANCELLED"

#### `HotelBookingResponse` (object)

Response from `hotel:book`

- `agentCode` (AgentCode, required)
- `bookingID` (BookingID, required)
- `supplierInformation` (SupplierInformation, required)
- `vendorInformation` (VendorInformation, required)
- `hotelInformation` (HotelBookingInfo, required)
- `hotelRoomInformation` (HotelBookingRoomInfo[], required)
- `hotelRoomGuestData` (RoomGuestData, required)
- `roomCombinationType` (RoomCombinationType, required)
- `roomIndexCombinationList` (RoomIndexCombination[], required)
- `remarkList` (RemarkList, required)

#### `HotelBookingInfo` (object)

Hotel info in booking response

- `id` (string, required) - Supplier hotel ID
- `name` (string, required)
- `description` (string, required)
- `address` (string, required)
- `star` (number, required)
- `checkInDate` (DateYMD, required)
- `checkInInfo` (string, required)
- `checkOutDate` (DateYMD, required)
- `checkOutInfo` (string, required)
- `countryCode` (string, required)
- `countryName` (string, required)
- `destinationName` (string, required)
- `latitude` (number, required)
- `longitude` (number, required)
- `pictureUrl` (string, required)
- `norms` (string[], required)

#### `HotelBookingRoomInfo` (object)

- `roomIndex` (number, required)
- `roomID` (string, required)
- `roomName` (string, required)
- `roomBoardInclusion` (string, required)
- `roomSupplementList` (object[], nullable)
- `roomPrice` (RoomPrice, required)
- `roomNote` (string, nullable)
- `numberOfRooms` (number, required)
- `numberOfAdults` (number, required)
- `numberOfChildrens` (number, required)
- `numberOfInfants` (number, required)
- `roomCancellationPolicyList` (RoomCancellationPolicyList, required)

#### `HotelRoomCheckPriceResponse` (object)

Response from `hotel:room:checkprice`

- `hotelID` (object, required)
  - `supplierCode` (SupplierCode, required)
  - `hotelID` (string, required) - Supplier hotel ID
- `agentCode` (AgentCode, required)
- `supplierCode` (SupplierCode, required)
- `checkInDate` (DateYMD, required)
- `checkOutDate` (DateYMD, required)
- `numberOfNights` (number, required)
- `totalNumberOfRooms` (number, required)
- `roomCombinationType` (RoomCombinationType, required)
- `roomIndexCombinationList` (RoomIndexCombination[], required)
- `roomInformations` (RoomInformation[], required)

### Other Types

#### `ClientReference` (string)

Client reference identifier

#### `ChildrenAges` (number[][])

Children ages PER ROOM: one array per room (length = `totalRooms`), each holding the ages of the children in that room; use `[]` for a room without children, e.g. `[[5, 8], []]` for 2 rooms. When not empty, the number of children in each room is the length of its array (`totalChilds` is then ignored). A flat array such as `[5, 8]` is not accepted. When omitted or empty, `totalChilds` is spread across the rooms and every child's age is taken as 8.

#### `RemarkList` (string[])

Array of remarks

#### `Term` (string)

Search term

#### `DestinationKey` (string)

Destination key identifier

### Auth Types

#### `UserName` (string)

Api credentials username

#### `Password` (string)

Api credentials password

#### `Signature` (string)

Api credentials computed signature `md5(username + password + pre-shared-key)`

#### `AgentProfile` (object)

Per-agent settings passed to `token:create` in `profile` (flight) or `profileHotel` (hotel).

- `code` (AgentCode, required)
- `policy` ([`AgentPricingPolicy`](#agentpricingpolicy-object), nullable, optional)
- `policyFlight` ([`FlightPricingPolicy`](#flightpricingpolicy-object), nullable, optional) - Only used in `profile`

#### `AgentPricingPolicy` (object)

Values may be numbers or numeric strings. Without `markupPercent` the policy is not applied (for flights, unless a `policyFlight` entry matches), so send `markupPercent` even when there is no markup (use 0). Give `platformFee` and `discountCBD` as well (use 0 when not applicable).

- `markupPercent` (number, optional) - Agent markup in percent (e.g. 4 = 4%), returned as `agentServiceFee` / `agentIssuedFee` and included in `agentSellingFare`
- `platformFee` (number, optional) - Platform fee in percent (e.g. 2 = 2%). Returned as the fraction `platformFee` (0.02) and the amount `platformFeeAmount`, which is included in `TOPSellingFare`
- `discountCBD` (number, optional) - CBD discount in percent. Returned as the fraction `discountCBD` and the amount `discountCBDAmount` (informational, not subtracted from `TOPSellingFare`)

#### `FlightPricingPolicy` (object)

Optional flight markup for specific airlines (`profile` only). For flights whose marketing carrier is listed in `airline`, it replaces `policy.markupPercent`; `policy.platformFee` and `policy.discountCBD` still apply and must be given.

- `type` ("FIXED" | "PERCENT", required) - "FIXED": `amount` per passenger. "PERCENT": `percent` of the published fare
- `amount` (number, optional) - Agent fee per passenger when `type` is "FIXED"
- `percent` (number, optional) - Agent markup in percent when `type` is "PERCENT"
- `airline` (object, required) - Object whose values are lists of marketing carrier codes this policy applies to (the keys are not interpreted), e.g. `{"domestic": ["GA", "QG"]}`

### Flight Types

#### `ScheduleInfo` (object)

- `journeys` (Journey[], required)
- `segments` (Segment[], required)
- `legs` (Leg[], required)

#### `ScheduleResult` (object)

- `journeyType` (JourneyType, required)
- `journeyIDS` (JourneyID[], required)
- `segmentIDS` (SegmentID[], required)
- `currencyCode` (string, optional)
- `journeySegmentFares` (JourneySegmentFare[], required)

#### `ScheduleFareInfoParams` (object)

- `totalPaxs` (PaxCount, required)

#### `ScheduleFareInfo` (object)

- `totalPaxs` (PaxCount, required)
- `segments` (SegmentResult[], required)
- `journeys` (BookingJourney[], optional)

#### `ScheduleFareDetails` (object)

- `journeyIDS` (JourneyID[], required)
- `segmentIDS` (SegmentID[], required)
- `agentCode` (AgentCode, required)
- `journeySegmentFares` (JourneySegmentFareSelection[], required)
- `isCombinedJourneys` (boolean, required)

#### `JourneySegmentFareSelection` (object)

Used in schedule fare request

- `journeyID` (JourneyID, required)
- `segmentFares` (SegmentFareSelection[], required)

#### `ScheduleFareDetailResult` (object)

- `journeyIDS` (JourneyID[], required)
- `segmentIDS` (SegmentID[], required)
- `agentCode` (AgentCode, required)
- `supplairCode` (SupplairCode, required)
- `fareDetails` (FareDetail[], required)
- `fareSummary` (FareSummary, required)
- `segmentSSRS` (FareSegmentSSR[], optional)

#### `FlightBookInfo` (object)

- `contactInfo` (ContactInfo, required)
- `paxs` (Pax[], required)
