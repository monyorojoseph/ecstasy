import { StarIcon } from '@heroicons/react/solid'


const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  images: [
    {
      src: 'https://unsplash.com/photos/tDoHiqXl9b8',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://unsplash.com/photos/kID9sxbJ3BQ',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://unsplash.com/photos/DoK5qEy2L60',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://unsplash.com/photos/DoK5qEy2L60',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const ItemDetails = ()=> {

  return (
    <div className="container mx-auto">
      <div className="pt-3">
        {/* Image gallery */}
        <div className="mt-3 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden rounded-lg overflow-hidden lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="w-full h-60 object-center object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src={product.images[1].src}
              alt={product.images[1].alt}
              className="w-full h-60 object-center object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src={product.images[2].src}
              alt={product.images[2].alt}
              className="w-full h-60 object-center object-cover"
            />
          </div>
          <div className="sm:rounded-lg sm:overflow-hidden">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="w-full h-60 object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="tracking-tight text-3xl text-gray-900">{product.price}</p>

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
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">


              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-2 px-8 flex items-center 
                justify-center text-sm font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-indigo-500"
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
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemDetails;