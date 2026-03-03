import './StatusModal.css';

import { useChat } from "../../context/ChatContext";

const StatusModal = () => {
    const { activeStatus, closeStatus } = useChat();

    if (!activeStatus) return null;

    return (
        <div className="status-overlay" onClick={closeStatus}>
            <button className="close-status">×</button>

            <video
                src={activeStatus}
                autoPlay
                muted
                className="status-video"
                onEnded={closeStatus}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

export default StatusModal;