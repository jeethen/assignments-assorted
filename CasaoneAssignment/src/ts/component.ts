export class Component {
  constructor() {
    console.log('Component Class');
  }
  configData() {
    return {
      "Rent": {
        "type": "num",
        "min": 1,
        "max": 10000,
        "unit": "$"
      },
      "Age": {
        "type": "num",
        "min": 10,
        "max": 60,
        "unit": "years"
      },
      "Zip_Code": {
        "type": "text",
        "condition": "",
        "unit": ""
      },
      "Order_Type": {
        "type": "list",
        "options": [
          "TV",
          "Beds",
          "Dining Table",
          "Sofa"
        ],
        "unit": ""
      },
      "Tenure": {
        "type": "num",
        "min": 1,
        "max": 12,
        "unit": "month/s"
      }
    }
  }
  operands() {
    return {
      "arithemticops": [
        "Less Than",
        "More Than",
        "Equals",
        "Contains",
        "Less or Equal",
        "More or Equal"
      ],
      "logicalOps": [
        "And"
      ]
    }
  }
}