(() => {

  /*
      "1": {
      "subscription": "one-year",
      "product": "calls-only",
      "completeStatus": "not-complete",
      "price": {
        "perMonth": {
          "old": 16,
          "amount": 14.5
        }
      }
    },
   */
  function run () {
    const variants = {};
    const collections = {};
    let key = 1;

    let completeStatus = "not-complete";
    collections[completeStatus] = {};
    Object.entries(entities.subscriptions).forEach(([subsKey, subscription]) => {
      collections[completeStatus][subsKey] = {
        variants: []
      };
      Object.entries(entities.products).forEach(([packKey, productObj]) => {
        variants[key.toString()] = {
          "subscription": subsKey,
          "product": packKey,
          "completeStatus": completeStatus,
          "price": {
            "perMonth": {
              "old": productObj.price.old,
              "amount": productObj.price.amount - subscription.discount
            }
          }
        };
        collections[completeStatus][subsKey].variants.push(key);
        if(productObj.isBestChoice) {
          collections[completeStatus][subsKey].bestChoice = key;
        }
        key++;
      });
    });

    completeStatus = "mobile-complete";
    collections[completeStatus] = {};
    Object.entries(entities.subscriptions).forEach(([subsKey, subscription]) => {
      collections[completeStatus][subsKey] = {
        variants: []
      };
      Object.entries(entities.products).forEach(([packKey, productObj]) => {
        variants[key.toString()] = {
          "subscription": subsKey,
          "product": packKey,
          "completeStatus": completeStatus,
          "price": {
            "perMonth": {
              "old": productObj.price.old,
              "amount": productObj.price.amount - subscription.discount - entities.completeStatuses['mobile-complete'].discount
            }
          }
        };
        collections[completeStatus][subsKey].variants.push(key);
        if(productObj.isBestChoice) {
          collections[completeStatus][subsKey].bestChoice = key;
        }
        key++;
      });
    });
    completeStatus = "full-complete";
    collections[completeStatus] = {};
    Object.entries(entities.subscriptions).forEach(([subsKey, subscription]) => {
      collections[completeStatus][subsKey] = {
        variants: []
      };
      Object.entries(entities.completeproducts).forEach(([packKey, productObj]) => {
        variants[key.toString()] = {
          "subscription": subsKey,
          "product": packKey,
          "completeStatus": completeStatus,
          "price": {
            "perMonth": {
              "old": entities.products[productObj.parent].price.old,
              "amount": entities.products[productObj.parent].price.amount - subscription.discount - entities.completeStatuses['mobile-complete'].discount
            }
          }
        };
        collections[completeStatus][subsKey].variants.push(key);
        if(entities.products[productObj.parent].isBestChoice) {
          collections[completeStatus][subsKey].bestChoice = key;
        }
        key++;
      });
    });
    console.log(JSON.stringify({
      variants,
      collections
    }));
  }
  const entities = {
    "subscriptions": {
      "one-year": {
        "title": "1 jaar (+ €1)",
        "slug": "one-year",
        "discount": 0
      },
      "two-year": {
        "title": "2 jaar",
        "slug": "two-year",
        "discount": 1
      }
    },
    "products": {
      "calls-only": {
        "internet": "0 GB",
        "slug": "calls-only",
        "callLimit": 150,
        "price": {
          "old": 16,
          "amount": 14.5
        }
      },
      "1-gb": {
        "internet": "1 GB",
        "slug": "1-gb",
        "callLimit": 200,
        "price": {
          "old": 25,
          "amount": 21
        }
      },
      "3-gb": {
        "internet": "3 GB",
        "slug": "3-gb",
        "price": {
          "old": 40,
          "amount": 27
        }
      },
      "10-gb": {
        "internet": "10 GB",
        "slug": "10-gb",
        "price": {
          "old": 45,
          "amount": 31
        },
        "isBestChoice": true
      },
      "25-gb": {
        "internet": "25 GB",
        "slug": "25-gb",
        "price": {
          "old": 55,
          "amount": 37
        }
      },
      "50-gb": {
        "internet": "50 GB",
        "slug": "50-gb",
        "price": {
          "old": 109,
          "amount": 80
        },
        "international": true
      }
    },
    "completeproducts": {
      "calls-only-complete": {
        "internet": "0 GB",
        "slug": "calls-only-complete",
        "callLimit": 300,
        "parent": "calls-only"
      },
      "2-gb-complete": {
        "internet": "2 GB",
        "slug": "2-gb-complete",
        "callLimit": 400,
        "parent": "1-gb"
      },
      "6-gb-complete": {
        "internet": "6 GB",
        "slug": "6-gb-complete",
        "parent": "3-gb"
      },
      "20-gb-complete": {
        "internet": "20 GB",
        "slug": "20-gb-complete",
        "parent": "10-gb"
      },
      "50-gb-complete": {
        "internet": "50 GB",
        "slug": "50-gb-complete",
        "parent": "25-gb"
      },
      "100-gb-complete": {
        "internet": "100 GB",
        "slug": "100-gb-complete",
        "parent": "50-gb",
        "international": true
      }
    },
    "completeStatuses": {
      "not-complete": {
        "slug": "not-complete"
      },
      "mobile-complete": {
        "slug": "mobile-complete",
        "discount": 5
      },
      "full-complete": {
        "slug": "full-complete",
        "discount": 5
      }
    }
  };

  run();
})();