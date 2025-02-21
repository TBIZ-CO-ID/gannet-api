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

| Method                 | Description                | Example                                                    |
| ---------------------- | -------------------------- | ---------------------------------------------------------- |
| `flight:schedule:list` | List available flights     | [View Example](./pub/example/01_flight_schedule_list.json) |
| `flight:schedule:fare` | Get flight pricing         | [View Example](./pub/example/02_flight_schedule_fare.json) |
| `flight:book`          | Create flight booking      | [View Example](./pub/example/03_flight_book.json)          |
| `flight:sync`          | Synchronize booking status | [View Example](./pub/example/04_flight_sync.json)          |
| `flight:cancel`        | Cancel flight booking      | [View Example](./pub/example/05_flight_cancel.json)        |
| `flight:issue`         | Issue flight tickets       | [View Example](./pub/example/05_flight_issue.json)         |

### 🏨 Hotel Operations

| Method                       | Description             | Example                                                          |
| ---------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `hotel:destinations:list`    | Search destinations     | [View Example](./pub/example/11_hotel_destinations_list.json)    |
| `hotel:searchby:destination` | Find hotels by location | [View Example](./pub/example/12_hotel_searchby_destination.json) |
| `hotel:fetch:detail`         | Get hotel details       | [View Example](./pub/example/13_hotel_fetch_detail.json)         |
| `hotel:fetch:rooms`          | Get available rooms     | [View Example](./pub/example/13_hotel_fetch_rooms.json)          |
| `hotel:book`                 | Create hotel booking    | [View Example](./pub/example/14_hotel_book.json)                 |
| `hotel:fetch:booking`        | Get booking details     | [View Example](./pub/example/15_hotel_fetch_booking.json)        |
| `hotel:cancel`               | Cancel hotel booking    | [View Example](./pub/example/15_hotel_cancel.json)               |
| `hotel:issue`                | Issue hotel voucher     | [View Example](./pub/example/15_hotel_issue.json)                |

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
   Understanding `roomCombinationType`:
   - `FixedRoomCombination`: Must select specific room combinations
   - `FreeRoomCombination`: Flexible room selection
   - `IdenticalRoomCombination`: All rooms must be same type

3. **Booking Phase**
   - Create booking using `hotel:book`
   - Monitor status with `hotel:fetch:booking`

4. **Completion Phase**
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
  - `username` ([`UserName`](#username-string), required) - Api credentials username
  - `password` ([`Password`](#password-string), required) - Api credentials password
  - `signature` ([`Signature`](#signature-string), required) - Api credentials computed signature

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `token` (string, required)

### Flight

#### "flight:schedule:list"

- Request Parameters
  - `carriers` ([`Carriers`](#carriers-string), required) - Array of carrier codes
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
  - `totalAdults` (number, required)
  - `totalChilds` (number, required)
  - `checkInDate` ([`DateYMD`](#dateymd-string), required)
  - `checkOutDate` ([`DateYMD`](#dateymd-string), required)
  - `childrenAges` ([`ChildrenAges`](#childrenages-number), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelLists` (Array of HotelResult, required)

#### "hotel:fetch:detail"

- Request Parameters
  - `id` ([`HotelID`](#hotelid-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotel` (Hotel, required)

#### "hotel:fetch:rooms"

- Request Parameters
  - `id` ([`HotelID`](#hotelid-string), required)
  - `searchKeyData` (string, required)
  - `agentCodes` (Array of [`AgentCode`](#agentcode-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `hotelLists` (Array of HotelResult, required)

#### "hotel:book"

- Request Parameters
  - `roomSelectedData` (Array of [`RoomSelected`](#roomselected-object), required)
  - `roomGuestData` ([`RoomGuestData`](#roomguestdata-object), required)
  - `clientReference` ([`ClientReference`](#clientreference-string), required)
  - `remarkList` ([`RemarkList`](#remarklist-string), required)

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `booking` (Booking, required)

#### "hotel:fetch:booking", "hotel:cancel", "hotel:issue"

- Request Parameters
  - `agentCode` ([`AgentCode`](#agentcode-string), required)
  - `bookingID` ([`BookingID`](#bookingid-string), required)
  - `remark` (string, required) - Only for cancel/issue

- Response
  - `result` ([`RPCResult`](#rpcresult-object), required)
  - `booking` (Booking, required)

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

#### `BookingID` (string)

Booking identifier

#### `BookingCode` (string)

Booking code identifier

#### `BookingStatus` (enum)

Values: "BOOKED" | "CANCELLED" | "TICKETED"

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

### Flight Types

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

- `segmentID` (string, required)
- `origin` (Station, required)
- `destination` (Station, required)
- `arrivalDateTime` (DateTimeLocal, required)
- `departureDateTime` (DateTimeLocal, required)
- `stopOver` (number, required)
- `operatingCarrierInfo` (CarrierInfo, required)
- `marketingCarrierInfo` (CarrierInfo, required)
- `legIDS` (string[], required)

#### `Leg` (object)

- `legID` (string, required)
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

- `paxType` (string, required)
- `paxID` (string, required)
- `nationality` (string, required)
- `title` (string, required)
- `firstName` (string, required)
- `lastName` (string, required)
- `dob` (string, required)
- `freeCheckinBaggage` (array, optional)

### Booking Types

#### `BookingPNR` (object)

- `supplairCode` (string, required)
- `agentCode` (AgentCode, required)
- `info` (object, required)
- `bookingSummary` (BookingFareSummary, required)
- `bookingTimeLimit` (DateTimeUTC, required)
- `bookingDateTime` (DateTimeUTC, required)
- `scheduleFareDetail` (array, required)
- `bookingID` (BookingID, required)
- `bookingStatus` (BookingStatus, required)
- `bookingCode` (BookingCode, required)

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

### Fare Types

#### `Fare` (object)

- `fareCode` (string, required)
- `fareBasisCode` (string, required)
- `fareGroupCode` (FareGroupCode, required)
- `seatAvailable` (number, required)
- `baggageFree` (object, required)
  - `weight` (string, required)
  - `unit` (string, required)
- `canBuyAdditionalBaggage` (boolean, required)
- `currencyCode` (string, required)
- `agentOffersFare` (array, required)

#### `FareGroupCode` (enum)

Values: "E" | "PE" | "B" | "F" | "PF"

#### `FareSSR` (object)

- `ssrType` (string, required)
- `ssrCode` (string, required)
- `ssrText` (string, required)
- `ssrPrice` (number, required)
- `ssrRoute` (string, required)
- `ssrWeight` (string, required)
- `ssrUnit` (string, required)

### Carrier Types

#### `Carrier` (string)

Carrier code (e.g., "QG", "GA")

#### `CarrierInfo` (object)

- `carrierCode` (CarrierCode, required)
- `flightNumber` (string, required)
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

#### `RoomSelected` (object)

- `agentCode` (AgentCode, required)
- `hotelID` (HotelID, required)
- `roomIDS` (array, required)
  - `roomNumber` (number, required)
  - `roomPriceKey` (string, required)

#### `RoomHolder` (object)

- `firstName` (string, required)
- `lastName` (string, required)

#### `RoomGuest` (object)

- `roomNumber` (number, required)
- `type` ("ADT" | "CHD", required)
- `title` (string, required)
- `firstName` (string, required)
- `lastName` (string, required)

#### `HotelID` (string)

Hotel ID identifier

### Other Types

#### `ClientReference` (string)

Client reference identifier

#### `ChildrenAges` (number[])

Array of children ages

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

### Flight Types

#### `ScheduleInfo` (object)

- `journeys` (Array of Journey, required)
- `segments` (Array of Segment, required)
- `legs` (Array of Leg, required)

#### `ScheduleResult` (object)

- `journeyType` (JourneyType, required)
- `journeyIDS` (Array of JourneyID, required)
- `segmentIDS` (Array of SegmentID, required)
- `currencyCode` (string, optional)
- `journeySegmentFares` (Array of JourneySegmentFare, required)

#### `ScheduleFareInfoParams` (object)

- `totalPaxs` (PaxCount, required)

#### `ScheduleFareInfo` (object)

- `totalPaxs` (PaxCount, required)
- `segments` (Array of SegmentResult, required)

#### `ScheduleFareDetails` (object)

- `journeyIDS` (Array of JourneyID, required)
- `segmentIDS` (Array of SegmentID, required)
- `agentCode` (AgentCode, required)
- `journeySegmentFares` (Array of JourneySegmentFare, required)
- `isCombinedJourneys` (boolean, required)

#### `ScheduleFareDetailResult` (object)

- `journeyIDS` (Array of JourneyID, required)
- `segmentIDS` (Array of SegmentID, required)
- `agentCode` (AgentCode, required)
- `supplairCode` (string, required)
- `fareDetails` (Array of FareDetail, required)
- `fareSummary` (FareSummary, required)
- `segmentSSRS` (Array of FareSegmentSSR, optional)

#### `FlightBookInfo` (object)

- `contactInfo` (ContactInfo, required)
- `paxs` (Array of Pax, required)

### Hotel Types

#### `RoomGuestData` (object)

- `roomHolder` (RoomHolder, required)
- `roomGuestList` (Array of RoomGuest, required)
