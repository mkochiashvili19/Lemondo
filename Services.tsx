import React from 'react';
import { Layout, Zap, Bot, Smartphone, Palette, ShieldCheck } from 'lucide-react';

const services = [
  {
    title: 'თანამედროვე დიზაინი',
    description: 'Tailwind CSS-ის გამოყენებით ვქმნი ულამაზეს, სუფთა და მიმზიდველ ინტერფეისებს.',
    icon: <Palette className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'სწრაფი წარმადობა',
    description: 'React-ისა და TypeScript-ის კომბინაცია უზრუნველყოფს აპლიკაციის სისწრაფესა და საიმედოობას.',
    icon: <Zap className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'AI ინტეგრაცია',
    description: 'Gemini API-ს გამოყენებით შემიძლია დავამატო ჭკვიანი ფუნქციები თქვენს საიტზე.',
    icon: <Bot className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'რესპონსიულობა',
    description: 'თქვენი საიტი იდეალურად გამოჩნდება როგორც მობილურზე, ისე პლანშეტსა და კომპიუტერზე.',
    icon: <Smartphone className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'სუფთა არქიტექტურა',
    description: 'კოდი არის სტრუქტურირებული, მარტივად წაკითხვადი და მზად სამომავლო განვითარებისთვის.',
    icon: <Layout className="w-8 h-8 text-indigo-600" />
  },
  {
    title: 'უსაფრთხოება',
    description: 'ვიყენებ თანამედროვე სტანდარტებსა და საუკეთესო პრაქტიკებს უსაფრთხოების უზრუნველსაყოფად.',
    icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-indigo-600 font-semibold tracking-wide uppercase text-sm mb-2">ჩემი შესაძლებლობები</h2>
          <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            რისი გაკეთება შემიძლია?
          </h3>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            გთავაზობთ სრულყოფილ გადაწყვეტილებებს ვებ-დეველოპმენტისთვის, იდეიდან რეალიზაციამდე.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}