
export const USPSService = {
  validateAddress,
}

//#556: replace all '#' with 'apt' since number signs cause invalid xml.
const searchRegExp = /#/gm;

const fixAptAddressForService = (
  originalAddress: string,
): string => {
  if (originalAddress) {
    // remove all '#'s and prepend 'apt ' (service is ok with 'apt suite apt 1A')
    return `apt ${originalAddress.replace(searchRegExp, ' ')}`
  } else {
    return ''
  }
}

async function validateAddress(
  address1: string,
  address2: string,
  city: string,
  state: string,
  zip: string
): Promise<Document> {
  const headers: HeadersInit = new Headers()
  const config = {
    method: 'GET',
    headers,
  }
  const xml = `<AddressValidateRequest USERID="040SAGEB0745"><Address><Address1>${address1}</Address1><Address2>${fixAptAddressForService(address2)}</Address2>
    <City>${city || ''}</City><State>${state || ''}</State><Zip5>${zip || ''}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`
  const endpoint = `https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${encodeURI(xml)}`
  return await fetch(endpoint, config).then(response => {
    if (!response.ok && response.status !== 412) {
      return Promise.reject(response.statusText)
    } else {
      return response.text()
    }
  }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
}

