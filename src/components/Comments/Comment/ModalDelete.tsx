import { useContext } from 'react';
import { CommentType } from 'shared/types/comment.type';
import CommentContext from 'context/comment-context';
import Backdrop from 'components/UI/Backdrop';
import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';
import 'styles/Comments/Comment/ModalDelete.scss';

type Props = {
  username: string;
  id: number;
  commentType: CommentType;
  hideDeleteModalHandler: () => void;
};

const ModalDelete = (props: Props) => {
  const { currentUser, onDelete } = useContext(CommentContext);
  const { username, id, commentType, hideDeleteModalHandler } = props;

  const deleteHandler = () => {
    hideDeleteModalHandler();
    if (username !== currentUser.username) {
      return;
    }
    onDelete(id, commentType);
  };

  return (
    <>
      <Backdrop
        className="modal-delete--backdrop"
        onClick={hideDeleteModalHandler}
      />
      <Modal className="modal-delete">
        <p className="modal-delete--title">Delete comment</p>
        <p className="modal-delete--text">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="modal-delete__buttons">
          <Button
            className="modal-delete__buttons--1"
            onClick={hideDeleteModalHandler}
          >
            NO, CANCEL
          </Button>
          <Button className="modal-delete__buttons--2" onClick={deleteHandler}>
            YES, DELETE
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalDelete;
