import { StarIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { stateTypes } from '../../interface_types/state'
import { itemImagesType, itemReducerTypes } from '../../redux/reducers/item'
import { getItemDetails } from '../../redux/actions/item'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface PropsType {
  getItemDetails: Function
  item: itemReducerTypes
}

const ItemDetails = ({getItemDetails, item}: PropsType)=> {
  let params = useParams()
  const { loading, goodie } = item 

  useEffect(()=> {
    getItemDetails(params.slug)
  }, [])

  return (
    <div className="container mx-auto">
      <div className="pt-3">
        {/* Image gallery */}
        <div className="mt-3 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl flex justify-start space-x-3 px-3 overflow-x-auto">
          {
            goodie.images.map((image: itemImagesType)=> (
              <div className="rounded-lg overflow-hidden" key={image.id}>
                <img
                  src={`http://localhost:8000${image.image}`}
                  alt={`${image.item}`}
                  className="w-full h-60 object-center object-cover"
                />
            </div>
            ))
          }
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-3xl">
              {goodie.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">goodie information</h2>
            <p className="tracking-tight text-3xl text-gray-900">{goodie.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-orange-600 hover:text-orange-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">


              <button
                type="submit"
                className="mt-10 w-full bg-orange-500 border border-transparent rounded-md py-2 px-8 flex items-center 
                justify-center text-lg md:text-sm font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-orange-500"
              >
                Add to cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{goodie.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              {/* <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {goodie.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{goodie.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:stateTypes)=> ({
  item: state.item
})

const mapDispatchToProps = {
  getItemDetails
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);