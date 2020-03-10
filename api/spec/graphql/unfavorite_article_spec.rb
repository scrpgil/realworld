# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'unfavoriteArticle', type: :graphql do
  let(:query) do
    <<-GRAPHQL
    mutation UnfavoriteArticleMutation($slug: ID!) {
      unfavoriteArticle(slug: $slug) {
        article {
          slug
          favoritesCount
        }
      }
    }
    GRAPHQL
  end
  let(:user) { create(:user) }
  let(:tags) { create_list(:tag, 3) }
  let(:article) { create(:article, author: create(:author)) }
  let(:variables) do
    {
      slug: article.slug
    }
  end

  before(:each) do
    Favorite.create(article: article, user: user)
  end

  context 'current_user is not defined' do
    let(:result) do
      {
        'data' => {
          'unfavoriteArticle' => nil
        },
        'errors' => [
          {
            'extensions' => { 'code' => 'UNAUTHORIZED', 'details' => {}, 'fullMessages' => [] },
            'locations' => [
              { 'column' => 7, 'line' => 2 }
            ],
            'message' => 'You are not authorized to perform this action', 'path' => ['unfavoriteArticle']
          }
        ]
      }
    end
    it { is_expected.to eql result }
  end

  context 'current_user is defined' do
    let(:current_user) { user }

    let(:result) do
      {
        'data' => {
          'unfavoriteArticle' => {
            'article' => {
              'favoritesCount' => 0,
              'slug' => 'title-1'
            }
          }
        }
      }
    end

    it { is_expected.to eql result }
  end
end
