import CreateService from "../connection/CreateService";

/**
 * Asynchronously retrieves a list of options from a service and formats them for use in UI components.
 *
 * @async
 * @function
 * @param {string} servicePath - The path or identifier for the service to fetch options from.
 * @param {Object} customFilter - An object containing filter criteria to apply when fetching options.
 * @returns {Promise<Array<{id: any, value: string, label: JSX.Element}>>} 
 *   A promise that resolves to an array of option objects, each containing an `id`, a `value` string, and a `label` JSX element.
 * @throws Will log an error message to the console if the service call fails.
 */
const getOptions = async (servicePath, customFilter) => {
    const service = CreateService(servicePath);

    try {
        const listItems = await service.getOptions( customFilter );

        return listItems.map( ({id, name}) => ({
                id,
                value: `${name}`,
                label: <label>{ `${name}` }</label>
            })
        );
    } catch (error) {
        console.log(error.message)
    }
}

const provider = {
    getOptions
}

export default provider;