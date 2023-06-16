import Modal from "./Modal";
import { useKeyAvailable } from "../hooks/useKey";

const ProviderModal = () => {
    const keyAvaialble = useKeyAvailable();
    if (keyAvaialble) {
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
