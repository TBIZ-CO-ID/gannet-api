(ns me.cli
  (:require
   [clojure.string]
   ["effect" :refer [JSONSchema Schema]]

   ))

(defn ^:export main [& args]
  (pr-str args))


(comment
  ,

  (def Person
    (Schema.Struct
     #js {:name Schema.String
          :age Schema.Number}))

  (JSONSchema.make Person)


  )
