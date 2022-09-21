import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import { getItems } from '../../redux/actions/item';
import { getCurrencyFormat } from '../../utils/formatCurrency';

  
const Items = ({getItems, item})=> {
    const { loading, goodies } = item

    useEffect(()=> {
      getItems()
    }, [])

    return (
        <div className="container mx-auto">
          {
            loading ? 
            (<Loading />) :
            (

              <div className="max-w-2xl mx-auto pt-3 pb-8 px-4 sm:pb-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {goodies.map((goodie) => (
                    <Link key={goodie.slug} to={`/item-${goodie.slug}`} className="group">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                        src={`http://localhost:8000/${goodie.cover_image}`}
                        alt={goodie.slug}
                        className="w-full object-center object-cover group-hover:opacity-75 h-32 md:h-40"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{goodie.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{goodie.category.map((name)=>name.name)}</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">{getCurrencyFormat(goodie.price)}</p>
                    </Link>
                ))}
                </div>
            </div>
            )
          }
        </div>
    )
}

const mapStateToProps = (state)=> ({
  item: state.item
})

const mapDispatchToProps = {
  getItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
