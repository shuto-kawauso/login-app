const database = [
  {
    id: 1,
    name: 'product1',
    price: 100,
    content: 'details of product1',
    reviews: [
      {
        rid: 1,
        title: 'This is awesome!!!',
        star: 5,
        detail: 'This item is super cool. It is very cheap and useful. I am glad to get this.',
        reviewer: 'Mike'
      },
      {
        rid: 2,
        title: 'not bad',
        star: 3,
        detail: 'I do not like this design and color. but it works. so, not good, not but.',
        reviewer: 'Kate'
      },
      {
        rid: 3,
        title: 'Never Buy!',
        star: 1,
        detail: 'I cannot believe it. this is super bad one. I never buy this, ever.',
        reviewer: 'Chris'
      }
    ]
  },
  {
    id: 2,
    name: 'product2',
    price: 200,
    content: 'details of product2',
    reviews: [
      {
        rid: 1,
        title: 'This is awesome!!!',
        star: 5,
        detail: 'This item is super cool. It is very cheap and useful. I am glad to get this.',
        reviewer: 'Mike'
      },
      {
        rid: 2,
        title: 'not bad',
        star: 3,
        detail: 'I do not like this design and color. but it works. so, not good, not but.',
        reviewer: 'Kate'
      },
      {
        rid: 3,
        title: 'Never Buy!',
        star: 1,
        detail: 'I cannot believe it. this is super bad one. I never buy this, ever.',
        reviewer: 'Chris'
      }
    ]
  },
  {
    id: 3,
    name: 'product3',
    price: 300,
    content: 'details of product3',
    reviews: [
      {
        rid: 1,
        title: 'This is awesome!!!',
        star: 5,
        detail: 'This item is super cool. It is very cheap and useful. I am glad to get this.',
        reviewer: 'Mike'
      },
      {
        rid: 2,
        title: 'not bad',
        star: 3,
        detail: 'I do not like this design and color. but it works. so, not good, not but.',
        reviewer: 'Kate'
      },
      {
        rid: 3,
        title: 'Never Buy!',
        star: 1,
        detail: 'I cannot believe it. this is super bad one. I never buy this, ever.',
        reviewer: 'Chris'
      }
    ]
  }
]

export default {
  fetch () { return database },
  // findProduct (id) { return database.find(el => el.id === id) },
  findReview (id, rid) {
    return database.find(product => product.id === id).reviews.find(review => review.rid === rid)
  },
  asyncFind (id, callback) {
    setTimeout(() => {
      callback(database.find(el => el.id === id))
    }, 10)
  },
  asyncFindReview (id, rid, callback) {
    setTimeout(() => {
      callback(this.findReview(id, rid))
    }, 10)
  }
}
