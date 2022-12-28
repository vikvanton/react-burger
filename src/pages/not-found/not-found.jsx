import InfoMessage from "../../components/info-message/info-message";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function NotFound() {
    return (
        <InfoMessage text="Страница не найдена">
            <CloseIcon type="error" />
        </InfoMessage>
    );
}

export default NotFound;
