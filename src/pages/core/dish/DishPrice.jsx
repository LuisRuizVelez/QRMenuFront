import {useSelector} from "react-redux";
import {getStateByPath} from "../../../store/navigation/navigationThunks";
import {STORE_PATHS_CORE_DISH} from "../../../store/StorePaths";

const DishPrice = () => {
    const componentState = useSelector(state => getStateByPath(state, STORE_PATHS_CORE_DISH));
    const { selectedItem } = componentState?.data;

  return (
    <div className="text-lg font-semibold text-gray-900">
        Precios de {selectedItem?.id || 'Plato'}
    </div>
  );
}

export default DishPrice;