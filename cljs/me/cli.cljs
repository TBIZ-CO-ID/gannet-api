(ns me.cli
  (:require
   [shadow.cljs.modern :refer [js-await]]
   [missionary.core :as m]
   [clojure.string]
   ["bun" :as bun]
   ["effect" :refer [JSONSchema Schema]]
   ["@open-rpc/schema-utils-js"
    :refer [parseOpenRPCDocument
            validateOpenRPCDocument]]
   ,))

(defn ^:export main [& args]
  (pr-str args))

(comment
  ,

  (-> (js/Buffer.from (bun/MD5.hash "ridho"))
      (.toString "hex"))

  (-> (doto (js/Bun.CryptoHasher "md5")
        (.update "ridho"))
      (.digest "hex"))

  ,)


;; -----------------------------------------------------------------------------


(defn promise->task [p]
  (let [v (m/dfv)]
    (.then p #(v (fn [] %)) #(v (fn [] (throw %))))
    (m/absolve v)))

(defn run-task2 [t]
  (-> (js/Promise. t)
      (.then (fn [x] (js/console.log "ok" x)))
      (.catch (fn [x] (js/console.log "fail" x)))))

(defn run-task
  ([t s!]
   (t s! (fn [x] (js/console.error x))))
  ([t s! f!]
   (t s! f!)))

(defn read-json-from-file
  [path]
  (m/sp
    (let [text (m/? (promise->task (.text (js/Bun.file path))))
          doc (js/JSON.parse text)]
      doc)))

#_
(defn check []
  (m/sp
    (let [text (m/? (promise->task
                     (.text (js/Bun.file "./doc/ref/demo-petstore.json"))))
          doc (js/JSON.parse text)]
      doc)))


(defn gen-openrpc
  [schemas]
  {:openrpc "1.2.1"

   :info
   {:version "1.0.0"
    :title "Gannet JsonRPC API"
    :description "Gannet is api for booking flight, hotel, etcetera."
    :license {:name "UNLICENSED"}}

   :servers
   [{:url "https://gannet.julia.id/jsonrpc"}]

   :methods
   [
    {:name "token_create"
     :summary "Create authentication token"
     :tags [{:name "auth"}]
     :params [{:name "username"
               :schema {"$ref" "#/components/schemas/UserName"}}
              {:name "password"
               :schema {"$ref" "#/components/schemas/Password"}}
              {:name "signature"
               :schema {"$ref" "#/components/schemas/Signature"}}]

     :result {:name "token"
              :schema {:type "string"}}

     ,}

    {:name "flight:schedule:list"
     :summary "Get flight schedule list"
     :tags [{:name "flight"}]
     :params [{:name "carriers"
               :schema { "$ref" "#/components/schemas/Carriers"}}
              {:name "paxCount"
               :schema { "$ref" "#/components/schemas/PaxCount"}}
              {:name "schedules"
               :schema { "$ref" "#/components/schemas/Schedules"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :info {"$ref" "#/components/schemas/ScheduleInfo"}
                        :schedules {"$ref" "#/components/schemas/ScheduleResults"}}}}
     ,}

    {:name "flight:schedule:fare"
     :summary "Get flight schedule fare detail"
     :tags [{:name "flight"}]
     :params [{:name "info"
               :schema { "$ref" "#/components/schemas/ScheduleFareInfoParams"}}
              {:name "scheduleFareDetail"
               :schema { "$ref" "#/components/schemas/ScheduleFareDetails"}}
              ]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :info {"$ref" "#/components/schemas/ScheduleFareInfo"}
                        :scheduleFareDetail {"$ref" "#/components/schemas/ScheduleFareDetailResults"}}}}
     ,}

    {:name "flight:book"
     :summary "Book a flight"
     :tags [{:name "flight"}]
     :params [{:name "info"
               :schema { "$ref" "#/components/schemas/FlightBookInfo"}}
              {:name "scheduleFareDetail"
               :schema { "$ref" "#/components/schemas/ScheduleFareDetails"}}
              ]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :pnrs {"$ref" "#/components/schemas/BookingPNRs"}}}}
     ,}

    {:name "flight:issue"
     :summary "Issue ticket for a booked flight"
     :tags [{:name "flight"}]
     :params [{:name "bookingId"
               :schema { "$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :pnrs {"$ref" "#/components/schemas/BookingPNRs"}}}}
     ,}

    {:name "flight:cancel"
     :summary "Cancel a booked flight"
     :tags [{:name "flight"}]
     :params [{:name "bookingId"
               :schema { "$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :pnrs {"$ref" "#/components/schemas/BookingPNRs"}}}}
     ,}

    {:name "flight:sync"
     :summary "Synchronize a booked flight"
     :tags [{:name "flight"}]
     :params [{:name "bookingId"
               :schema { "$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}
                        :pnrs {"$ref" "#/components/schemas/BookingPNRs"}}}}
     ,}


    ;; ---

    {:name "hotel:destinations:list"
     :summary "Get destination list available for hotel search"
     :tags [{:name "hotel"}]
     :params [{:name "terms"
               :schema { "$ref" "#/components/schemas/Term"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:searchby:destination"
     :summary "Search hotel for a given destination"
     :tags [{:name "hotel"}]
     :params [{:name :destinationKey
               :schema {"$ref" "#/components/schemas/DestinationKey"}}
              {:name :totalRooms
               :schema {"$ref" "#/components/schemas/TotalRooms"}}
              {:name :totalAdults
               :schema {"$ref" "#/components/schemas/TotalAdults"}}
              {:name :totalChilds
               :schema {"$ref" "#/components/schemas/TotalChilds"}}
              {:name :checkInDate
               :schema {"$ref" "#/components/schemas/DateYMD"}}
              {:name :checkOutDate
               :schema {"$ref" "#/components/schemas/DateYMD"}}
              {:name :childrenAges
               :schema {"$ref" "#/components/schemas/ChildrenAges"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:fetch:detail"
     :summary "Get hotel detailed information"
     :tags [{:name "hotel"}]
     :params [{:name :id
               :schema {"$ref" "#/components/schemas/HotelID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:fetch:rooms"
     :summary "Get hotel room information for an available date"
     :tags [{:name "hotel"}]
     :params [{:name :id
               :schema {"$ref" "#/components/schemas/HotelID"}}
              {:name :searchKeyData
               :schema {"$ref" "#/components/schemas/SearchKey"}}
              {:name :agentCodes
               :schema {"$ref" "#/components/schemas/AgentCodes"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:book"
     :summary "Get hotel room information for an available date"
     :tags [{:name "hotel"}]
     :params [{:name :id
               :schema {"$ref" "#/components/schemas/HotelID"}}
              {:name :roomSelectedData
               :schema {"$ref" "#/components/schemas/RoomSelected"}}
              {:name :roomGuestData
               :schema {"$ref" "#/components/schemas/RoomGuestData"}}
              {:name :clientReference
               :schema {"$ref" "#/components/schemas/ClientReference"}}
              {:name :remarkList
               :schema {"$ref" "#/components/schemas/RemarkList"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:fetch:booking"
     :summary "Get a booked hotel"
     :tags [{:name "hotel"}]
     :params [{:name :bookingId
               :schema {"$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:cancel"
     :summary "Cancel a booked hotel"
     :tags [{:name "hotel"}]
     :params [{:name :bookingId
               :schema {"$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    {:name "hotel:issue"
     :summary "Issue ticket for a booked hotel"
     :tags [{:name "hotel"}]
     :params [{:name :bookingId
               :schema {"$ref" "#/components/schemas/BookingID"}}]

     :result {:name "response"
              :schema {:type "object"
                       :properties
                       {:result {"$ref" "#/components/schemas/RPCResult"}}}}
     ,}

    ,]

   :components
   {:schemas schemas}}
  ,)

(defn spit-openrpc!
  []
  (run-task
   (m/sp (let [schemas (m/? (read-json-from-file "./pub/schemas.json"))
               openrpc (gen-openrpc schemas)]
           (m/? (promise->task
                 (js/Bun.write "./pub/openrpc.json"
                               (js/JSON.stringify (clj->js openrpc) nil 2))))))
   prn))

(defn validate-openrpc!
  []
  (run-task
   (m/sp (let [doc (m/? (promise->task
                         (parseOpenRPCDocument "./pub/openrpc.json")))
               valid (validateOpenRPCDocument doc)
               ]
           valid

           #_#_
           (prn (type valid))
           (if (instance? js/Error valid)
             (throw (ex-info (.-message valid) {}))
             "ok")))
   prn
   ))

(comment
  (spit-openrpc!)
  (validate-openrpc!)

  ,)


(comment
  ,

  (def Person
    (Schema.Struct
     #js {:name Schema.String
          :age Schema.Number}))

  (JSONSchema.make Person)

  parseOpenRPCDocument

  (-> (js/Bun.file "./doc/ref/demo-petstore.json")
      (.text)
      (.then (fn [x] (js/JSON.parse x)))
      )

  (js-await [x (-> (js/Bun.file "./doc/ref/demo-petstore.json")
                   (.text)
                   (.then (fn [x] (js/JSON.parse x))))]
    (def demo-petstore-doc x))

  demo-petstore-doc

  (run-task2 (promise->task (js/Promise.resolve 1)))

  (run-task (promise->task (js/Promise.resolve 1)) prn)



  (run-task
   (m/sp (let [schemas (m/? (read-json-from-file "./pub/schemas.json"))
               openrpc (gen-openrpc schemas)]
           (m/? (promise->task
                 (js/Bun.write "./pub/openrpc.json"
                               (js/JSON.stringify (clj->js openrpc) nil 2))))))
   prn)

  (-> (parseOpenRPCDocument "./out/gannet_api.json")
      (promise->task)
      (run-task (fn [x] (prn (validateOpenRPCDocument x)))))


  ;; validate

  ;; https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/TBIZ-CO-ID/gannet-api/refs/heads/main/gannet_api.json



  ;; https://raw.githubusercontent.com/TBIZ-CO-ID/gannet-api/refs/heads/main/gannet_api.json


  )



(comment
  ,

  "hotel:destinations:list"
  {:params
   {:term ""}}

  "hotel:searchby:destination"
  {:destinationKey ""
   :totalRooms 1
   :totalAdults 1
   :totalChilds 0
   :checkInDate "2025-04-01"
   :checkOutDate "2025-04-02"
   :childrenAges []
   ,}

  "hotel:fetch:detail"
  {:params
   {:id ""}}

  "hotel:fetch:rooms"
  {:params
   {:id ""
    :searchKeyData ""
    :agentCodes [""]}}


  "hotel:book"
  {:params
   {:roomSelectedData
    [{:agentCode ""
      :hotelID ""
      :roomIDS [{:roomNumber 1
                 :roomPriceKey ""}]}]
    :roomGuestData
    {:roomHolder {:firstName ""
                  :lastName ""}
     :roomGuestList
     [{:roomNumber 1
       :type ""
       :title ""
       :firstName ""
       :lastName ""}]}
    :clientReference ""
    :remarkList [""]}
   ,}


  )
