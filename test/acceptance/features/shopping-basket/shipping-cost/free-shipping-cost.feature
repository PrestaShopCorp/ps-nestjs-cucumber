@shopping-basket @shipping-cost @free
Feature: Compute free shipping cost

  Scenario: No free shipping when basket price equal 30€
    Given the basket '01JBVS5G2V5JPKHZ23EV0V6M6A' is created
    And the item 'trousers_467FJCFD' is added to the basket '01JBVS5G2V5JPKHZ23EV0V6M6A'
    When the shipping fees are calculated for basket '01JBVS5G2V5JPKHZ23EV0V6M6A'
    Then the shipping are not free for the basket '01JBVS5G2V5JPKHZ23EV0V6M6A'

  Scenario: Free shipping when basket price equal 60€ without new product
    Given the basket '01JBVRX1MEJHHQ9GJFMK5P4CFR' is created
    And the item 'trousers_96834DU' is added to the basket '01JBVS5G2V5JPKHZ23EV0V6M6A'
    When the shipping fees are calculated for basket '01JBVRX1MEJHHQ9GJFMK5P4CFR'
    Then the shipping are free for the basket '01JBVRX1MEJHHQ9GJFMK5P4CFR'

  Scenario: No free shipping when basket price equal 70€ and contains new product
    Given the basket '01JBVS5P0WPRPZ4RJ3JT1ZAKKY' is created
    And the item 'new_trouser_9GJ7423' is added to the basket '01JBVS5G2V5JPKHZ23EV0V6M6A'
    When the shipping fees are calculated for basket '01JBVS5P0WPRPZ4RJ3JT1ZAKKY'
    Then the shipping are not free for the basket '01JBVS5P0WPRPZ4RJ3JT1ZAKKY'
