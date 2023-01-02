import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { FC } from 'react'
import { APP_NAME } from '../../lib/config'

const FaqBlock: FC = () => {
  return (
    <div className="w-full max-w-2xl px-6 py-2 text-base text-left">
      <Accordion className="faq-block">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="text-lg font-semibold text-primary"
        >
          Do {APP_NAME} crypto-agreements have legal power?
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          {APP_NAME} crypto-agreements don't have legal power, at least not yet.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="text-lg font-semibold text-primary"
        >
          Is my data private?
        </AccordionSummary>
        <AccordionDetails>
          <p>
            We store agreement data on the Ethereum blockchain, which is public
            by its nature, so user data privacy can not be ensured nor
            guaranteed.
          </p>
          <p>
            If it's important for you or your partner to stay anonymous, we
            recommend using aliases instead of your real names.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="text-lg font-semibold text-primary"
        >
          What if I want to divorce?
        </AccordionSummary>
        <AccordionDetails>
          <p>
            In case you or your partner need to terminate your crypto-agreement,
            use the <b>"What if I changed my mind?"</b> link at the bottom of
            the agreement page when you're logged in.
          </p>
          <p>
            If the <b>Termination Cost</b> set by the agreement creator is 0, no
            additional charges required (except the network gas fees).
          </p>
          <p>
            If the agreement creator set a non-zero <b>Termination Cost</b>, a
            partner who terminates the agreement will have to pay this amount to
            the oppostite partner as a compensation.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="text-lg font-semibold text-primary"
        >
          What are the Ethereum network fees and why I need to pay them?
        </AccordionSummary>
        <AccordionDetails>
          <p>
            <b>Ethereum network fees (aka gas fees)</b> are a way to pay for
            computational resources used for executing transations on the
            Ethereum blockchain. Gas fees are paid in Ethereum's native
            currency, Ether (ETH).
          </p>
          <p>
            The gas fees are paid to the Ethereum network and not to the
            MarrySign platform.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default FaqBlock
