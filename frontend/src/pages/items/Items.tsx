import { Link } from 'react-router-dom';


const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: 'Candies',
      price: '$48',
      imageSrc: 'https://unsplash.com/photos/NxRx7_mPdEk',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: 'Cookie',
      price: '$35',
      imageSrc: 'https://unsplash.com/photos/GHVBpTkSqfs',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: 'Chocolate',
      price: '$89',
      imageSrc: 'https://unsplash.com/photos/NxRx7_mPdEk',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: 'Blunt',
      price: '$35',
      imageSrc: 'https://unsplash.com/photos/tDoHiqXl9b8',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ]
  
const Items = ()=> {

    return (
        <div className="container mx-auto">
        <div className="max-w-2xl mx-auto pt-3 pb-8 px-4 sm:pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <Link key={product.id} to={`/item-${product.href}`} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full object-center object-cover group-hover:opacity-75 h-60 "
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.href}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                </Link>
            ))}
            </div>
        </div>
        </div>
    )
}

export default Items;
