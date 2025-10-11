import CreateService from "../connection/CreateService";

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