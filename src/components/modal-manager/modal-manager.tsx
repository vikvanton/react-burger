import { useHistory, Redirect } from "react-router-dom";
import {
    selectIngredientInModal,
    selectOrderInModal,
} from "../../services/selectors/view-in-modal";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useAppSelector } from "../../utils/hooks";
import { TLocationBackgState } from "../../utils/types";

function ModalManager(): JSX.Element {
    const orderInModal = useAppSelector(selectOrderInModal);
    const ingredientInModal = useAppSelector(selectIngredientInModal);
    const history = useHistory<TLocationBackgState>();

    const closeModal = (): void => {
        history.goBack();
    };

    return (
        <>
            {history.location.state?.background && (
                <>
                    {orderInModal ? (
                        <Modal
                            header={`#${orderInModal.number}`}
                            headerExtraClass="text text_type_digits-default"
                            onClose={closeModal}
                        >
                            <OrderInfo order={orderInModal} />
                        </Modal>
                    ) : ingredientInModal ? (
                        <Modal header="Детали ингредиента" onClose={closeModal}>
                            <IngredientDetails ingredient={ingredientInModal} />
                        </Modal>
                    ) : (
                        <Redirect to={history.location.pathname} />
                    )}
                </>
            )}
        </>
    );
}

export default ModalManager;
