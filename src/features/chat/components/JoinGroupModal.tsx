import Modal from '../../../components/Modal'
import { useAppDispatch } from '../../../store/hooks'
import { joinGroup } from '../../../store/groupSlice';

type JoinGroupModalProps = {
  groupSlug: string
}

const JoinGroupModal = ({groupSlug}: JoinGroupModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <Modal>
      <div className="p-4 bg-zinc-800 rounded flex items-center flex-col">
        <h2 className="text-lg font-bold">Join {groupSlug}?</h2>
        <button onClick={() => {dispatch(joinGroup(groupSlug))}} className="px-2 py-1 bg-zinc-700 rounded mt-4">Yes!</button>
      </div>
    </Modal>
  )
}

export default JoinGroupModal