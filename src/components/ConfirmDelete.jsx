import {confirmAlert} from "react-confirm-alert";
import navigationActions from "../store/navigation/navigationActions";
import {Card, CardBody} from "reactstrap";



/**
 * A confirmation dialog component for deleting a record.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string|number} props.id - The unique identifier of the record to delete.
 * @param {string} props.path - The navigation path associated with the record.
 * @param {string} props.service - The service name related to the record.
 * @param {string} [props.title="Confirmar eliminación"] - The title of the confirmation dialog.
 * @param {string} [props.message="¿Estás seguro de que deseas eliminar este registro?"] - The message displayed in the confirmation dialog.
 * @param {boolean} [props.closeOnEscape=true] - Whether the dialog should close when the Escape key is pressed.
 * @param {boolean} [props.closeOnClickOutside=true] - Whether the dialog should close when clicking outside of it.
 * @returns {void} - Renders a custom confirmation dialog.
 *
 * @example
 * <ConfirmDelete
 *   id={1}
 *   path="dashboard"
 *   service="userService"
 *   title="Delete User"
 *   message="Are you sure you want to delete this user?"
 * />
 */
const ConfirmDelete = ({
    id,
    storePath,
    servicePath,
    title = "Confirmar eliminación",
    message = "¿Estás seguro de que deseas eliminar este registro?",
    closeOnEscape = true,
    closeOnClickOutside = true
}) => confirmAlert({
    closeOnEscape,
    closeOnClickOutside,
    customUI: ({onClose}) => <Card>
        <CardBody>
            <h1>{title}</h1>
            <p>{message}</p>
            <button className={"btn btn-primary"} onClick={onClose}>Salir</button>
            <button className={"btn btn-secondary"} onClick={() => {
                // Add your delete logic here
                navigationActions.remove(storePath, servicePath, id)
                onClose();
            }}>Eliminar</button>
        </CardBody>
    </Card>
})

export default ConfirmDelete;