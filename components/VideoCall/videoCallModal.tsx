import ZegoCall from "./ZegoCall";

interface VideoCallModalProps {
  isOpen: boolean;
  roomId: string;
  userId: string;
  userName: string;
  onClose: () => void;
}

export const VideoCallModal = ({
  isOpen,
  roomId,
  userId,
  userName,
  onClose
}: VideoCallModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">

      <ZegoCall
        roomId={roomId}
        userId={userId}
        userName={userName}
        onEndCall={onClose}
      />

    </div>
  );
};