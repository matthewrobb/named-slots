import create from '../../lib/create';
import polyfill from '../../../src/shadow/polyfill';

describe('light/polyfill', function () {
  let host, light1, light2, root, slot, text;

  beforeEach(function () {
    slot = create('slot');
    host = create('div');
    root = polyfill(host);

    root.appendChild(slot);

    light1 = create('light1');
    light2 = create('light2');
    text = document.createTextNode('text');

    host.appendChild(light1);
    host.appendChild(text);
    host.appendChild(light2);
  });

  it('assignedSlot', function () {
    expect(light1.assignedSlot).to.equal(slot);
  });

  it('parentElement', function () {
    expect(light1.parentElement).to.equal(host);
  });

  it('parentNode', function () {
    expect(light1.parentNode).to.equal(host);
  });

  it('nextSibling', function () {
    expect(light1.nextSibling).to.equal(text);
  });

  it('nextElementSibling', function () {
    expect(light1.nextElementSibling).to.equal(light2);
  });

  it('previousSibling', function () {
    expect(light2.previousSibling).to.equal(text);
  });

  it('previousElementSibling', function () {
    expect(light2.previousElementSibling).to.equal(light1);
  });

  describe('when removed', function () {
    let anotherHost, anotherNode, anotherRoot, anotherSlot;

    beforeEach(function () {
      anotherHost = create('div');
      anotherNode = create('div');
      anotherRoot = polyfill(anotherHost);
      anotherSlot = create('slot');

      anotherRoot.appendChild(anotherSlot);
      host.removeChild(light1);
    });

    it('should null parentNode', function () {
      expect(light1.parentNode).to.equal(null);
    });

    it('should null assignedSlot', function () {
      expect(light1.assignedSlot).to.equal(null);
    });

    describe('and reparented to the same host', function () {
      beforeEach(function () {
        host.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(host);
      });

      it('should keep assignedSlot null', function () {
        expect(light1.assignedSlot).to.equal(slot);
      });
    });

    describe('and reparented to a different host', function () {
      beforeEach(function () {
        anotherHost.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(anotherHost);
      });

      it('should keep assignedSlot null', function () {
        expect(light1.assignedSlot).to.equal(anotherSlot);
      });
    });

    describe('and reparented to a different node', function () {
      beforeEach(function () {
        anotherNode.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(anotherNode);
      });

      it('should keep assignedSlot null', function () {
        expect(light1.assignedSlot).to.equal(null);
      });
    });
  });

  describe('when directly reparented', function () {
    let anotherHost, anotherNode, anotherRoot, anotherSlot;

    beforeEach(function () {
      anotherHost = create('div');
      anotherNode = create('div');
      anotherRoot = polyfill(anotherHost);
      anotherSlot = create('slot');

      anotherRoot.appendChild(anotherSlot);
    });

    describe('to the same host', function () {
      beforeEach(function () {
        host.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(host);
      });

      it('should reset assignedSlot', function () {
        expect(light1.assignedSlot).to.equal(slot);
      });
    });

    describe('to a different host', function () {
      beforeEach(function () {
        anotherHost.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(anotherHost);
      });

      it('should reset assignedSlot', function () {
        expect(light1.assignedSlot).to.equal(anotherSlot);
      });
    });

    describe('to a different node', function () {
      beforeEach(function () {
        anotherNode.appendChild(light1);
      });

      it('should reset parentNode', function () {
        expect(light1.parentNode).to.equal(anotherNode);
      });

      it('should reset assignedSlot', function () {
        expect(anotherNode.assignedSlot).to.equal(null);
      });
    });
  });
});
