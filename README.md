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
