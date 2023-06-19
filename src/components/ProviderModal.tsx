import Modal from "./Modal";
import useNip07 from "../hooks/useNip07";

const ProviderModal = () => {
    const providerAvailable = useNip07();
    if (providerAvailable) {
        return <></>;
    }
    return (
        <Modal>
            <div className="p-4 bg-zinc-800 rounded items-center flex flex-col justify-center">
                <p>No NIP07 provider found...</p>
                <p className="mb-4">
                    Get one at <a href="https://getalby.com">getalby.com</a>
                </p>
            </div>
        </Modal>
    );
};

export default ProviderModal;
