
import './css/Tailwind.css'
import 'flowbite'
const RefundPolicy = () => {
  return (

    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">RETURNS</h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-1">
          <div>
            <div className="mb-10">

              <p className="text-gray-700 dark:text-gray-700 text-xl">We have a 30-day return policy, which means you have 30 days after receiving your item to request a return. <br /><br />
                To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original
                packaging. You'll also need the receipt or proof of purchase. <br /> <br />

                To start a return, you can contact us at support@ecozer.com. Please note that returns will need to be sent to the following address:
                7011 Rue Durocher, Montréal, QC, H3N 1Z7, Canada <br /><br />
                If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent
                back to us without first requesting a return will not be accepted. Please note that if your country of residence is not Canada, shipping your
                goods may take longer than expected. <br /><br />
                You can always contact us for any return questions at support@ecozer.com.</p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-3xl font-medium text-gray-900 dark:text-white">

                Damages and Issues
              </h3>
              <p className="text-gray-700 dark:text-gray-700 text-xl">Please inspect your order upon receipt and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that
                we may evaluate the issue and make it right. <br />
                Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or
                personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable
                liquids, or gases. Please get in touch if you have questions or concerns about your specific item. <br /><br />
                Unfortunately, we cannot accept returns on sale items or gift cards</p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-3xl font-medium text-gray-900 dark:text-white">

                Exchanges
              </h3>
              <p className="text-gray-700 dark:text-gray-700 text-xl">The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for
                the new item. <br /><br />
                {/* European Union 3 day cooling off period <br />
                Notwithstanding the above, if merchandise is being shipped into the European Union, you have the right to cancel or return your order within 3
                days for any reason and without justification. As above, your item must be in the same condition that you received it, unworn or unused, with
                tags, and in its original packaging. You’ll also need the receipt or proof of purchase */}
                </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-3xl font-medium text-gray-900 dark:text-white">

                Refunds
              </h3>
              <p className="text-gray-700 dark:text-gray-700 text-xl">We will notify you once we’ve received and inspected your return to let you know if the refund was approved or not. If approved, you’ll be
                automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or
                credit card company to process and post the refund too. <br /><br />
                If more than 15 business days have passed since we’ve approved your return, please contact us at support@ecozer.com.</p>
            </div>



          </div>
        </div>
      </div>
    </section>

  );
}
export default RefundPolicy;