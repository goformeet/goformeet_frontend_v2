import React from "react";

const RefundPolicy = () => {
  return (
    <div className="custom-container py-32">
        <h2 className="text-3xl font-bold mb-4">Refund Policy</h2>
      <ul className="list-disc text-lg ml-10">
        <li className="">
          If you face any issues with payment or purchase, you can email us at{" "}
          <a
            className="underline text-[#0000ee]"
            href="mailto:info@goformeet.co"
          >
            info@goformeet.co
          </a>
        </li>
        <li>
          In case any payment is successful but the purchase fails, or in case
          of any duplicate payments, any amount debited from your account will
          automatically be refunded.
        </li>
        <li>
          You can request cancellation of the meet and refund before the meeting
          has started working on your case. Refunds will not be given if your
          case is already processed.
        </li>
        <li>
          Refunds will be completed within 7 (Seven) working days from the date
          of refund approval.
        </li>
        <li>
          In case of any non-compliance with our Terms of Use, you shall not be
          entitled to any refund and service will remain canceled.
        </li>
        <li>
          Goformeet is not accountable for refund or credit for payments such as
          taxes made to government entities.
        </li>
        <li>
          Any and all refunds will be approved only if it is found valid after
          proper verification by the Goformeet team.
        </li>
        <li>
          Approval of request for any cancellation or refund will be at the sole
          discretion of Goformeet.
        </li>
        <li>
          You hereby agree to have read, understood and consented to our refund
          policy.
        </li>
      </ul>
    </div>
  );
};

export default RefundPolicy;
