import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { getWhatsAppUrl, useCompanyData, type CompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';

type ServiceInquiryCtaProps = {
  title: string;
  description: string;
  contactLabel?: string;
  trainingTitle?: string;
  trainingDescription?: string;
  trainingLabel?: string;
  companyData?: CompanyData;
};

export const ServiceInquiryCta: React.FC<ServiceInquiryCtaProps> = ({
  title,
  description,
  contactLabel = 'Poproś o wycenę',
  trainingTitle,
  trainingDescription,
  trainingLabel = 'Zobacz ofertę szkoleń',
  companyData,
}) => {
  const contextCompany = useCompanyData();
  const company = companyData ?? contextCompany;
  const hasSecondaryServicePhone = Boolean(
    company.phones.services.secondaryValue && company.phones.services.secondaryHref
  );
  const primaryWhatsAppUrl = getWhatsAppUrl(company.phones.services.href, company.phones.services.value);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
      <div className="rounded-2xl border border-gray-800 bg-industrial-900 p-6 md:p-10">
        <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl md:text-3xl">{title}</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">{description}</p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
          <a
            href={`${company.links.basePath}/kontakt`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-industrial-accent px-5 py-3 text-sm font-bold text-industrial-900 transition-colors hover:bg-industrial-accentHover sm:w-auto sm:px-6 sm:text-base"
          >
            <Phone size={18} />
            {contactLabel}
          </a>
          <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <a
              href={company.phones.services.href}
              className="inline-flex w-full items-center justify-center rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-industrial-accent hover:text-industrial-accent sm:w-auto sm:px-6 sm:text-base"
            >
              Zadzwoń: {company.phones.services.value}
            </a>
            {hasSecondaryServicePhone ? (
              <a
                href={company.phones.services.secondaryHref}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-industrial-accent hover:text-industrial-accent sm:w-auto sm:px-6 sm:text-base"
              >
                Drugi numer: {company.phones.services.secondaryValue}
              </a>
            ) : null}
            {primaryWhatsAppUrl ? (
              <a
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-500/40 px-5 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white sm:w-auto sm:px-6 sm:text-base"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Napisz na WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {trainingTitle && trainingDescription ? (
        <div className="rounded-2xl border border-dashed border-gray-700 bg-industrial-900/60 p-6 md:p-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-industrial-accent">Cross-sell szkoleń</p>
          <h4 className="mb-3 text-lg font-bold text-white sm:text-xl">{trainingTitle}</h4>
          <p className="mb-6 text-sm leading-relaxed text-gray-400">{trainingDescription}</p>
          <a
            href={company.links.trainingSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-industrial-accent transition-colors hover:text-white sm:text-base"
          >
            {trainingLabel}
            <ArrowRight size={16} />
          </a>
        </div>
      ) : null}
    </div>
  );
};