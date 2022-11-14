import { FC } from 'react'

const Disclaimer: FC = () => {
  return (
    <div className="flex flex-row justify-center w-full p-3 mt-6 -mb-6 text-sm text-gray-500 border-t border-primary">
      <div className="max-w-xl text-left">
        <p>
          * Please note MarrySign agreements don't have legal power, at least
          not yet.
        </p>

        <p>
          ** This project have been developed for {' '}
          <a href="https://hack.chain.link">Chainlink Hackathon Fall 2022</a>.
        </p>
        <p>
          *** The app is still under development, so use it with caution.
        </p>
      </div>
    </div>
  )
}

export default Disclaimer
