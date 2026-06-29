import Image from "next/image";
import { FooterLink } from "@/components/custom/FooterLink";
// import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white pt-16 border-t border-gray-100">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Logo & Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/LOGO_BANGLA@2x.png"
              alt="Logo"
              width={160}
              height={120}
            />
          </div>

          <div className="space-y-1.5">
            <div>
              <p className="text-sm text-[#333333]">
                {t("FOOTER.GOT_QUESTIONS_CALL_US")}
              </p>
              <p className="text-sm text-[#333333] mt-2">
                {t("FOOTER.MOBILE_NUMBER")}
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-600 hover:text-[#FF7A64] transition-colors cursor-pointer">
              <span className="text-md">
                <Mail size={18} />
              </span>
              <p className="text-[#333333] text-sm mt-1.5 mb-2">
                contact@shamagra.com
              </p>
            </div>
            <div className="flex items-start gap-1.5 text-gray-600">
              <span className="text-lg">📍</span>
              <p className="text-sm leading-relaxed">
                {t("FOOTER.AREA")}
                <br />
                {t("FOOTER.ADDRESS")}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-lg text-[#333333] mb-6">
            {t("FOOTER.CUSTOMER_SUPPORT")}
          </h4>
          <ul className="space-y-3 text-[#333333]">
            <FooterLink label={t("FOOTER.STORE_LIST")} />
            <FooterLink label={t("FOOTER.OPENING_HOURS")} />
            <FooterLink label={t("FOOTER.CONTACT_US")} />
            <FooterLink label={t("FOOTER.RETURN_POLICY")} />
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-lg text-[#333333] mb-6">
            {t("FOOTER.CATEGORIES")}
          </h4>
          <ul className="space-y-3 text-[#333333]">
            <FooterLink label={t("FOOTER.NOVELS")} />
            <FooterLink label={t("FOOTER.POETRY_BOOKS")} />
            <FooterLink label={t("FOOTER.POLITICAL_BOOKS")} />
            <FooterLink label={t("FOOTER.HISTORY_BOOKS")} />
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="space-y-4">
          <h4 className="text-lg text-[#333333] mb-2">
            {t("FOOTER.SUBSCRIBE_NOW")}
          </h4>
          <p className="text-[#333333] text-sm">
            {t("FOOTER.OUR_CONVERSATION_IS_JUST_GETTING_STARTED")}
          </p>

          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-[#086880] transition-all">
            <input
              type="email"
              placeholder={t("FOOTER.ENTER_YOUR_EMAIL")}
              className="w-full px-4 py-3 text-sm focus:outline-none"
            />
            <button className="bg-linear-to-r from-[#086880] to-[#086880] text-white px-6 py-3 font-semibold text-sm hover:bg-[#086880] transition-colors">
              {t("FOOTER.SUBSCRIBE")}
            </button>
          </div>

          <div>
            <h4 className="text-lg text-[#333333]">
              {t("FOOTER.PAYMENT_US_ON")}
            </h4>
            <div className="flex gap-3">
              <span className="cursor-pointer">
                <Image
                  src="/images/bkash.svg"
                  alt="Bkash"
                  width={100}
                  height={100}
                />
              </span>
              <span className="cursor-pointer mt-3">
                <Image
                  src="/images/rocket.png"
                  alt="Rocket"
                  width={60}
                  height={30}
                />
              </span>
              <span className="cursor-pointer">
                <Image
                  src="/images/nagad.svg"
                  alt="Nogod"
                  width={100}
                  height={100}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-6 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center gap-6">
        <p className="text-sm text-gray-800 flex items-center">
          <span className="mr-1">©২০২৬</span>
          <span className="text-[#FF7A64] font-medium cursor-pointer">
            {t("FOOTER.SITE_NAME")}
          </span>
          , {t("FOOTER.ALL_RIGHTS_RESERVED")}
        </p>
      </div>
    </footer>
  );
};
