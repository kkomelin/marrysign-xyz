import Script from 'next/script'
import { FC } from 'react'

const JoinWaitlist: FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full px-6 bg-pink-100">
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" />
      <form
        action="https://app.convertkit.com/forms/3829316/subscriptions"
        className="py-16 md:py-20 seva-form formkit-form"
        method="post"
        data-sv-form="3829316"
        data-uid="18bae38596"
        data-format="inline"
        data-version="5"
        data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now please check your inbox to confirm your email.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":false,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"hide","custom_content":"Your email is on the waitlist already."},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
        min-width="400 500 600 700 800"
      >
        <div data-style="clean flex flex-col justify-center items-center">
          <ul
            className="formkit-alert formkit-alert-error"
            data-element="errors"
            data-group="alert"
          ></ul>
          <div className="px-4 pb-6 text-4xl text-center uppercase">
            Launch is coming
          </div>
          <div className="max-w-xl px-4 pb-10 text-2xl text-center text-primary">
            We're working hard to prepare for the launch. Be the first to know
            about it!
          </div>
          <div
            data-element="fields"
            data-stacked="false"
            className="flex flex-col items-center justify-centerseva-fields formkit-fields"
          >
            <div className="w-full max-w-lg my-3 formkit-field">
              <input
                className="block w-full px-6 py-3 text-lg border rounded-md shadow-sm formkit-input placeholder-input border-accent focus:outline-none focus:ring-primary focus:border-primary"
                name="email_address"
                aria-label="Email Address"
                placeholder="Email Address"
                required={true}
                type="email"
              />
            </div>
            <button
              data-element="submit"
              className="block px-8 py-3 mt-6 text-lg font-semibold text-white uppercase border-transparent rounded-lg formkit-submit bg-primary disabled:bg-gray-200"
            >
              <div className="formkit-spinner">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <span className="">Join Waitlist</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default JoinWaitlist
