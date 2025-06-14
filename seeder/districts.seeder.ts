const DEFAULT = [
  { region_id: 1, name: 'Amudaryo tumani' },
  { region_id: 1, name: 'Beruniy tumani' },
  { region_id: 1, name: 'Kegayli tumani' },
  { region_id: 1, name: "Qonliko'l tumani" },
  { region_id: 1, name: "Qorao'zak tumani" },
  { region_id: 1, name: "Qo'ng'irot tumani" },
  { region_id: 1, name: "Mo'ynoq tumani" },
  { region_id: 1, name: 'Nukus tumani' },
  { region_id: 1, name: 'Nukus shahri' },
  { region_id: 1, name: "Taxtako'pir tumani" },
  { region_id: 1, name: "To'rtko'l tumani" },
  { region_id: 1, name: "Xo'jayli tumani" },
  { region_id: 1, name: 'Chimboy tumani' },
  { region_id: 1, name: 'Shumanay tumani' },
  { region_id: 1, name: "Ellikqal'a tumani" },
  { region_id: 2, name: 'Andijon shahri' },
  { region_id: 2, name: 'Andijon tumani' },
  { region_id: 2, name: 'Asaka tumani' },
  { region_id: 2, name: 'Baliqchi tumani' },
  { region_id: 2, name: 'Buloqboshi tumani' },
  { region_id: 2, name: "Bo'z tumani" },
  { region_id: 2, name: 'Jalaquduq tumani' },
  { region_id: 2, name: 'Izbosgan tumani' },
  { region_id: 2, name: 'Qorasuv shahri' },
  { region_id: 2, name: "Qo'rg'ontepa tumani" },
  { region_id: 2, name: 'Marhamat tumani' },
  { region_id: 2, name: "Oltinko'l tumani" },
  { region_id: 2, name: 'Paxtaobod tumani' },
  { region_id: 2, name: "Ulug'nor tumani" },
  { region_id: 2, name: 'Xonabod tumani' },
  { region_id: 2, name: "Xo'jaobod tumani" },
  { region_id: 2, name: 'Shahrixon tumani' },
  { region_id: 3, name: 'Buxoro shahri' },
  { region_id: 3, name: 'Buxoro tumani' },
  { region_id: 3, name: 'Vobkent tumani' },
  { region_id: 3, name: "G'ijduvon tumani" },
  { region_id: 3, name: 'Jondor tumani' },
  { region_id: 3, name: 'Kogon tumani' },
  { region_id: 3, name: 'Kogon shahri' },
  { region_id: 3, name: "Qorako'l tumani" },
  { region_id: 3, name: 'Qorovulbozor tumani' },
  { region_id: 3, name: 'Olot tumani' },
  { region_id: 3, name: 'Peshku tumani' },
  { region_id: 3, name: 'Romitan tumani' },
  { region_id: 3, name: 'Shofirkon tumani' },
  { region_id: 4, name: 'Arnasoy tumani' },
  { region_id: 4, name: 'Baxmal tumani' },
  { region_id: 4, name: "G'allaorol tumani" },
  { region_id: 4, name: "Do'stlik tumani" },
  { region_id: 4, name: 'Sh.Rashidov tumani' },
  { region_id: 4, name: 'Jizzax shahri' },
  { region_id: 4, name: 'Zarbdor tumani' },
  { region_id: 4, name: 'Zafarobod tumani' },
  { region_id: 4, name: 'Zomin tumani' },
  { region_id: 4, name: "Mirzacho'l tumani" },
  { region_id: 4, name: 'Paxtakor tumani' },
  { region_id: 4, name: 'Forish tumani' },
  { region_id: 4, name: 'Yangiobod tumani' },
  { region_id: 5, name: "G'uzor tumani" },
  { region_id: 5, name: 'Dehqonobod tumani' },
  { region_id: 5, name: 'Qamashi tumani' },
  { region_id: 5, name: 'Qarshi tumani' },
  { region_id: 5, name: 'Qarshi shahri' },
  { region_id: 5, name: 'Kasbi tumani' },
  { region_id: 5, name: 'Kitob tumani' },
  { region_id: 5, name: 'Koson tumani' },
  { region_id: 5, name: 'Mirishkor tumani' },
  { region_id: 5, name: 'Muborak tumani' },
  { region_id: 5, name: 'Nishon tumani' },
  { region_id: 5, name: 'Chiroqchi tumani' },
  { region_id: 5, name: 'Shahrisabz tumani' },
  { region_id: 5, name: "Yakkabog' tumani" },
  { region_id: 6, name: 'Zarafshon shahri' },
  { region_id: 6, name: 'Karmana tumani' },
  { region_id: 6, name: 'Qiziltepa tumani' },
  { region_id: 6, name: 'Konimex tumani' },
  { region_id: 6, name: 'Navbahor tumani' },
  { region_id: 6, name: 'Navoiy shahri' },
  { region_id: 6, name: 'Nurota tumani' },
  { region_id: 6, name: 'Tomdi tumani' },
  { region_id: 6, name: 'Uchquduq tumani' },
  { region_id: 6, name: 'Xatirchi tumani' },
  { region_id: 7, name: 'Kosonsoy tumani' },
  { region_id: 7, name: 'Mingbuloq tumani' },
  { region_id: 7, name: 'Namangan tumani' },
  { region_id: 7, name: 'Namangan shahri' },
  { region_id: 7, name: 'Norin tumani' },
  { region_id: 7, name: 'Pop tumani' },
  { region_id: 7, name: "To'raqo'rg'on tumani" },
  { region_id: 7, name: 'Uychi tumani' },
  { region_id: 7, name: "Uchqo'rg'on tumani" },
  { region_id: 7, name: 'Chortoq tumani' },
  { region_id: 7, name: 'Chust tumani' },
  { region_id: 7, name: "Yangiqo'rg'on tumani" },
  { region_id: 8, name: "Bulung'ur tumani" },
  { region_id: 8, name: 'Jomboy tumani' },
  { region_id: 8, name: 'Ishtixon tumani' },
  { region_id: 8, name: "Kattaqo'rg'on tumani" },
  { region_id: 8, name: "Kattaqo'rg'on shahri" },
  { region_id: 8, name: "Qo'shrabot tumani" },
  { region_id: 8, name: 'Narpay tumani' },
  { region_id: 8, name: 'Nurabod tumani' },
  { region_id: 8, name: 'Oqdaryo tumani' },
  { region_id: 8, name: 'Payariq tumani' },
  { region_id: 8, name: "Pastarg'om tumani" },
  { region_id: 8, name: 'Paxtachi tumani' },
  { region_id: 8, name: 'Samarqand tumani' },
  { region_id: 8, name: 'Samarqand shahri' },
  { region_id: 8, name: 'Toyloq tumani' },
  { region_id: 8, name: 'Urgut tumani' },
  { region_id: 9, name: 'Angor tumani' },
  { region_id: 9, name: 'Boysun tumani' },
  { region_id: 9, name: 'Denov tumani' },
  { region_id: 9, name: "Jarqo'rg'on tumani" },
  { region_id: 9, name: 'Qiziriq tumani' },
  { region_id: 9, name: "Qo'mqo'rg'on tumani" },
  { region_id: 9, name: 'Muzrabot tumani' },
  { region_id: 9, name: 'Oltinsoy tumani' },
  { region_id: 9, name: 'Sariosiyo tumani' },
  { region_id: 9, name: 'Termiz tumani' },
  { region_id: 9, name: 'Termiz shahri' },
  { region_id: 9, name: 'Uzun tumani' },
  { region_id: 9, name: 'Sherobod tumani' },
  { region_id: 9, name: "Sho'rchi tumani" },
  { region_id: 10, name: 'Boyovut tumani' },
  { region_id: 10, name: 'Guliston tumani' },
  { region_id: 10, name: 'Guliston shahri' },
  { region_id: 10, name: 'Mirzaobod tumani' },
  { region_id: 10, name: 'Oqoltin tumani' },
  { region_id: 10, name: 'Sayxunobod tumani' },
  { region_id: 10, name: 'Sardoba tumani' },
  { region_id: 10, name: 'Sirdaryo tumani' },
  { region_id: 10, name: 'Xavos tumani' },
  { region_id: 10, name: 'Shirin shahri' },
  { region_id: 10, name: 'Yangiyer shahri' },
  { region_id: 11, name: 'Angiren shahri' },
  { region_id: 11, name: 'Bekabod tumani' },
  { region_id: 11, name: 'Bekabod shahri' },
  { region_id: 11, name: "Bo'ka tumani" },
  { region_id: 11, name: "Bo'stonliq tumani" },
  { region_id: 11, name: 'Zangiota tumani' },
  { region_id: 11, name: 'Qibray tumani' },
  { region_id: 11, name: 'Quyichirchiq tumani' },
  { region_id: 11, name: "Oqqo'rg'on tumani" },
  { region_id: 11, name: 'Olmaliq shahri' },
  { region_id: 11, name: 'Ohangaron tumani' },
  { region_id: 11, name: 'Parkent tumani' },
  { region_id: 11, name: 'Piskent tumani' },
  { region_id: 11, name: "O'rtachirchiq tumani" },
  { region_id: 11, name: 'Chinoz tumani' },
  { region_id: 11, name: 'Chirchiq shahri' },
  { region_id: 11, name: 'Yuqorichirchiq tumani' },
  { region_id: 11, name: "Yangiyo'l tumani" },
  { region_id: 12, name: 'Beshariq tumani' },
  { region_id: 12, name: "Bog'dod tumani" },
  { region_id: 12, name: 'Buvayda tumani' },
  { region_id: 12, name: "Dang'ara tumani" },
  { region_id: 12, name: 'Yozyovon tumani' },
  { region_id: 12, name: 'Quva tumani' },
  { region_id: 12, name: 'Quvasoy shahri' },
  { region_id: 12, name: "Qo'qon shahri" },
  { region_id: 12, name: "Qo'shtepa tumani" },
  { region_id: 12, name: "Marg'ilon shahri" },
  { region_id: 12, name: 'Oltiariq tumani' },
  { region_id: 12, name: 'Rishton tumani' },
  { region_id: 12, name: "So'x tumani" },
  { region_id: 12, name: 'Toshloq tumani' },
  { region_id: 12, name: "Uchko'prik tumani" },
  { region_id: 12, name: "O'zbekiston tumani" },
  { region_id: 12, name: "Farg'ona tumani" },
  { region_id: 12, name: "Farg'ona shahri" },
  { region_id: 12, name: 'Furqat tumani' },
  { region_id: 13, name: "Bog'ot tumani" },
  { region_id: 13, name: 'Gurlan tumani' },
  { region_id: 13, name: "Qo'shko'pir tumani" },
  { region_id: 13, name: 'Urganch tumani' },
  { region_id: 13, name: 'Urganch shahri' },
  { region_id: 13, name: 'Xiva tumani' },
  { region_id: 13, name: 'Xazarasp tumani' },
  { region_id: 13, name: 'Xonqa tumani' },
  { region_id: 13, name: 'Shavot tumani' },
  { region_id: 13, name: 'Yangiariq tumani' },
  { region_id: 13, name: 'Yangibozor tumani' },
  { region_id: 14, name: 'Bektimer tumani' },
  { region_id: 14, name: "Mirzo Ulug'bek tumani" },
  { region_id: 14, name: 'Mirobod tumani' },
  { region_id: 14, name: 'Olmazor tumani' },
  { region_id: 14, name: "Sirg'ali tumani" },
  { region_id: 14, name: 'Uchtepa tumani' },
  { region_id: 14, name: 'Yashnobod tumani' },
  { region_id: 14, name: 'Chilonzor tumani' },
  { region_id: 14, name: 'Shayxontohur tumani' },
  { region_id: 14, name: 'Yunusobod tumani' },
  { region_id: 14, name: 'Yakkasaroy tumani' },
  { region_id: 1, name: 'Taxiatosh shahri' },
  { region_id: 2, name: 'Asaka shahri' },
  { region_id: 9, name: 'Bandixon tumani' },
  { region_id: 11, name: 'Ohangaron shahri' },
  { region_id: 11, name: "Yangiyo'l shahri" },
  { region_id: 11, name: 'Toshkent tumani' },
  { region_id: 13, name: 'Xiva shahri' },
  { region_id: 13, name: "Do'stlik shahri" },
  { region_id: 14, name: 'Yangihayot tumani' },
  { region_id: 13, name: 'Tuproqqala tumani' },
  { region_id: 7, name: 'Davlatobod tumani' },
  { region_id: 6, name: "G'ozg'on shahri" },
  { region_id: 1, name: "Bo'zatov tumani" },
  { region_id: 5, name: 'Shahrisabz shahri' },
  { region_id: 5, name: "Ko'kdala tumani" },
];

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Districts } from '../src/modules/districts/entities/districts.entity';
// import { SeederMeta } from '../modules/META/seederMeta.entity';

export class DistrictsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const name = DistrictsSeeder.name;
    // const exits = await dataSource.getRepository(SeederMeta).findOneBy({
    //   name,
    // });

    // if (exits) {
    //   return;
    // }
    await dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Districts);

      for (let i = 0; i < DEFAULT.length; i++) {
        const { region_id, ...s } = DEFAULT[i];
        const user = repo.create({
          ...s,
          region: { id: region_id },
        });
        await repo.save(user);
      }
      // await manager.getRepository(SeederMeta).save({ name });
    });
  }
}
