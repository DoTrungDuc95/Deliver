import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of restaurant',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Enter rating from 1 to 5(star)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).error('Rating must be from 1 to 5'),
    }),
    defineField({
      name: 'genre',
      title: 'Category',
      type: 'reference',
      validation: (Rule) => Rule.required(),
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'dishes',
      title: 'Dishs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }),
  ],
})
