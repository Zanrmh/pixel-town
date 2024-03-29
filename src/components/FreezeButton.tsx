import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Button from './buttons/Button';

export default function FreezeButton() {
  const stopAllowed = useQuery(api.testing.stopAllowed) ?? false;
  const defaultWorld = useQuery(api.world.defaultWorldStatus);

  const frozen = defaultWorld?.status === 'stoppedByDeveloper';

  const unfreeze = useMutation(api.testing.resume);
  const freeze = useMutation(api.testing.stop);

  const flipSwitch = async () => {
    if (frozen) {
      console.log('Unfreezing');
      await unfreeze();
    } else {
      console.log('Freezing');
      await freeze();
    }
  };

  return !stopAllowed ? null : (
    <>
      <Button
        onClick={flipSwitch}
        title="Khi tạm dừng game, các nhân vật sẽ mất một thời gian để dừng việc họ đang làm trước khi bị tạm dừng."
        imgUrl="/assets/star.svg"
      >
        {frozen ? 'Tạm dừng' : 'Tiếp tục'}
      </Button>
    </>
  );
}
