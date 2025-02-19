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

(defn read-json-schema
  [path]
  (m/sp
    (let [text (m/? (promise->task (.text (js/Bun.file path))))
          doc (js/JSON.parse text)]
      doc)))

(defn check []
  (m/sp
    (let [text (m/? (promise->task
                     (.text (js/Bun.file "./doc/ref/demo-petstore.json"))))
          doc (js/JSON.parse text)]
      doc)))


(comment
  ,




  )




(defn gen-openrpc
  []
  {:openrpc "1.2.1"

   :info
   {:version "1.0.0"
    :title "Gannet JSONRPC API"
    :description "Gannet is api for booking of flight, hotel, etcetera."
    :license {:name "UNLICENSED"}}

   :servers
   [{:url "https://gannet.julia.id/jsonrpc"}]

   :methods
   [{:name "token_create"
     :summary "Create authentication token"
     :tags [{:name "auth"}]
     :params [{:name "TokenCreateParams"
               :schema { "$ref" "#/components/schemas/TokenCreateParams"}}]

     :result {:name "TokenCreateResult"
              :schema { "$ref" "#/components/schemas/TokenCreateResult"}}

     ;;:params [{"$ref" "#/components/schemas/TokenCreateParams"}]
     ;; :result {"$ref" "#/components/schemas/TokenCreateResult"}
     ;;:errors [{:code 500, :message "server error"}]
     ,}
    ,]

   :components
   {:schemas
    {:TokenCreateParams
     {:$schema "http://json-schema.org/draft-07/schema#",
      :type "object",
      :required ["username" "password" "signature"],
      :properties {:username {:type "string"},
                   :password {:type "string"},
                   :signature {:type "string"}},
      :additionalProperties false}

     ,
     :TokenCreateResult
     {:$schema "http://json-schema.org/draft-07/schema#",
      :type "object",
      :required ["response"],
      :properties {:response {:type "object",
                              :required ["result" "token"],
                              :properties {:result {:type "object",
                                                    :required ["time"
                                                               "status"],
                                                    :properties {:time {:type "object",
                                                                        :required ["request"
                                                                                   "response"
                                                                                   "process"
                                                                                   "unit"],
                                                                        :properties {:request {:type "number"},
                                                                                     :response {:type "number"},
                                                                                     :process {:type "number"},
                                                                                     :unit {:type "string"}},
                                                                        :additionalProperties false},
                                                                 :status {:type "string",
                                                                          :enum ["OK"
                                                                                 "ERROR"]},
                                                                 :errors {:type "array",
                                                                          :items {:type "string"}}},
                                                    :additionalProperties false},
                                           :token {:type "string"}},
                              :additionalProperties false}},
      :additionalProperties false}
     ,}}}
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
   (promise->task
    (js/Bun.write "./out/gannet_api.json" (js/JSON.stringify (clj->js (gen-openrpc)) nil 2)))
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
