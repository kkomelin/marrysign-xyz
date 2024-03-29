import { FC } from 'react'
import { Hearts } from 'react-loader-spinner'

type Props = {
  message?: string
}
const AppLoader: FC<Props> = ({ message = 'Working hard for you...' }) => {
  // @todo: Implement smooth transition with an animation of opacity.
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-full bg-opacity-50 bg-pink-50 heartbeat">
      <div className="flex flex-col items-center justify-center bg-white border-4 rounded-full shadow h-52 w-52 border-secondary shadow-primary">
        <Hearts
          height="80"
          width="80"
          color="var(--ms-color-secondary)"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <div className="px-6 py-2 text-sm text-center text-secondary">
          {message}
        </div>
      </div>
    </div>
  )
}

export default AppLoader
