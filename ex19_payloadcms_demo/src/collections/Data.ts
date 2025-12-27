import type { CollectionConfig } from 'payload'

export const Data: CollectionConfig = {
  slug: 'data',
  labels: {
    singular: {
      en: 'Data Item',
      ru: 'Элемент данных',
    },
    plural: {
      en: 'Data Items',
      ru: 'Элементы данных',
    },
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      label: {
        en: 'Name',
        ru: 'Название',
      },
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: {
        en: 'Description',
        ru: 'Описание',
      },
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
