require "test_helper"

class LanguagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @language = languages(:one)
  end

  test "should get index" do
    get languages_url, as: :json
    assert_response :success
  end

  test "should create language" do
    assert_difference("Language.count") do
      post languages_url, params: { language: { abbr: @language.abbr, name: @language.name } }, as: :json
    end

    assert_response :created
  end

  test "should show language" do
    get language_url(@language), as: :json
    assert_response :success
  end

  test "should update language" do
    patch language_url(@language), params: { language: { abbr: @language.abbr, name: @language.name } }, as: :json
    assert_response :success
  end

  test "should destroy language" do
    assert_difference("Language.count", -1) do
      delete language_url(@language), as: :json
    end

    assert_response :no_content
  end
end
