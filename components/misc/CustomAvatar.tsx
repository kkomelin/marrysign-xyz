import { AvatarComponent } from '@rainbow-me/rainbowkit'
import Avatar from 'boring-avatars'
import Image from 'next/image'

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <Image
      src={ensImage}
      width={size}
      height={size}
      className="rounded-full"
      alt="Address avatar"
    />
  ) : (
    <Avatar
      size={size}
      name={address}
      variant="marble"
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  )
}

export default CustomAvatar
